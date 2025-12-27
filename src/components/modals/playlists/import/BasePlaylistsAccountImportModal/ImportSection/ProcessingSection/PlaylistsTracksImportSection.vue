<template>
  <BaseDivider />

  <BaseProgress
    ref="progress"
    status="import"
    :scope="scope"
  />

  <TracksImportSection
    :key="tracksImportKey"
    :playlist-data="currentPlaylistData"
    @complete="handleTracksImportComplete"
  />
</template>

<script>
import BaseProgress from '@/components/BaseProgress.vue'
import TracksImportSection
  from './PlaylistsTracksImportSection/TracksImportSection.vue'
import BaseDivider from '@/components/BaseDivider.vue'

import {
  generateKey
} from '@/helpers/utils'
import {
  collection as formatCollection
} from '@/helpers/formatters'

export default {
  name: 'PlaylistsTracksImportSection',
  components: {
    BaseProgress,
    TracksImportSection,
    BaseDivider
  },
  props: {
    playlists: {
      type: Array,
      required: true
    }
  },
  emits: [
    'complete'
  ],
  data () {
    return {
      scope: 'playlists',
      currentPlaylistIndex: 0,
      playlistsComputed: [],
      successPlaylists: [],
      tracksImportKey: null
    }
  },
  computed: {
    currentPlaylistData () {
      return this.playlistsComputed[this.currentPlaylistIndex]
    },
    isGetNextPlaylistData () {
      return (
        this.currentPlaylistIndex < (
          this.playlistsCount - 1
        )
      )
    },
    playlistsCount () {
      return this.playlistsComputed.length
    }
  },
  watch: {
    currentPlaylistIndex: {
      immediate: true,
      handler: 'handleCurrentPlaylistIndexChange'
    }
  },
  beforeMount () {
    this.playlistsComputed = [
      ...this.playlists
    ]
  },
  mounted () {
    this.setProgressTotalCount()
  },
  methods: {
    async handleCurrentPlaylistIndexChange () {
      await this.$nextTick()

      this.incrementProgress()

      this.tracksImportKey = generateKey()
    },
    handleTracksImportComplete (
      {
        tracks
      }
    ) {
      this.currentPlaylistData.tracks =
        formatCollection(
          tracks
        )

      this.successPlaylists.push(
        this.currentPlaylistData
      )

      if (this.isGetNextPlaylistData) {
        this.currentPlaylistIndex += 1
      } else {
        this.setComplete()
      }
    },
    setProgressTotalCount () {
      this.$refs
        .progress
        .setTotalCount(
          this.playlistsCount
        )
    },
    incrementProgress () {
      this.$refs
        .progress
        .increment()
    },
    setComplete () {
      this.$emit(
        'complete',
        {
          successPlaylists: this.successPlaylists
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
