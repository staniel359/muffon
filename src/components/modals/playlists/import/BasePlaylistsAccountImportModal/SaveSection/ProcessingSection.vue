<template>
  <div
    v-if="error"
    class="main-top-section"
  >
    <BaseErrorMessage
      :error="error"
      is-with-refresh-button
      @refresh="handleRefresh"
    />
  </div>

  <BaseProgress
    ref="progress"
    status="save"
    :scope="scope"
  />

  <PlaylistTracksImportSection
    :key="tracksImportKey"
    :playlist-data="currentPlaylistData"
    @playlist-create-success="handlePlaylistCreateSuccess"
    @playlist-create-error="handlePlaylistCreateError"
    @complete="handlePlaylistTracksImportComplete"
  />
</template>

<script>
import BaseProgress from '@/components/BaseProgress.vue'
import PlaylistTracksImportSection
  from './ProcessingSection/PlaylistTracksImportSection.vue'
import BaseErrorMessage from '@/components/messages/BaseErrorMessage.vue'

import {
  generateKey
} from '@/helpers/utils'
import collectionMixin from '@/mixins/collectionMixin'

export default {
  name: 'ProcessingSection',
  components: {
    BaseProgress,
    PlaylistTracksImportSection,
    BaseErrorMessage
  },
  mixins: [
    collectionMixin
  ],
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
      tracksImportKey: null,
      currentPlaylistIndex: 0,
      playlistsComputed: [],
      successPlaylists: [],
      errorPlaylists: [],
      error: null
    }
  },
  computed: {
    currentPlaylistData () {
      return this.playlistsComputed[this.currentPlaylistIndex]
    },
    playlistsCount () {
      return this.playlistsComputed.length
    },
    isGetNextPlaylistData () {
      return (
        this.currentPlaylistIndex < (
          this.playlistsCount - 1
        )
      )
    }
  },
  watch: {
    currentPlaylistIndex:
      'handleCurrentPlaylistIndexChange'
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
    handleCurrentPlaylistIndexChange () {
      this.tracksImportKey = generateKey()
    },
    handlePlaylistCreateSuccess (
      {
        playlistData
      }
    ) {
      this.addCollectionItem(
        {
          collection: 'successPlaylists',
          item: playlistData
        }
      )

      this.incrementProgress()
    },
    handlePlaylistCreateError (
      {
        playlistData,
        error
      }
    ) {
      if (error) {
        this.error = error
      } else {
        this.addCollectionItem(
          {
            collection: 'errorPlaylists',
            item: playlistData
          }
        )

        this.incrementProgress()
      }
    },
    handlePlaylistTracksImportComplete () {
      if (this.isGetNextPlaylistData) {
        this.currentPlaylistIndex += 1
      } else {
        this.emitComplete()
      }
    },
    handleRefresh () {
      this.error = null

      this.tracksImportKey = generateKey()
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
    emitComplete () {
      this.$emit(
        'complete',
        {
          successPlaylists: this.successPlaylists,
          errorPlaylists: this.errorPlaylists
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
