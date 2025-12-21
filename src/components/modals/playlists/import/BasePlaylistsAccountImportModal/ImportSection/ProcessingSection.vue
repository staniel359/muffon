<template>
  <PlaylistsGetSection
    v-if="processingPhases.includes('playlists')"
    :source="source"
    :playlists-count="playlistsCount"
    @complete="handlePlaylistsImportComplete"
  />

  <PlaylistsTracksImportSection
    v-if="processingPhases.includes('tracks')"
    :playlists="playlists"
    @complete="handlePlaylistsTracksImportComplete"
  />
</template>

<script>
import PlaylistsGetSection
  from './ProcessingSection/PlaylistsGetSection.vue'
import PlaylistsTracksImportSection
  from './ProcessingSection/PlaylistsTracksImportSection.vue'

export default {
  name: 'ProcessingSection',
  components: {
    PlaylistsGetSection,
    PlaylistsTracksImportSection
  },
  props: {
    source: {
      type: String,
      required: true
    },
    playlistsCount: {
      type: Number,
      required: true
    }
  },
  emits: [
    'complete'
  ],
  data () {
    return {
      processingPhases: [],
      playlists: []
    }
  },
  computed: {},
  mounted () {
    this.processingPhases.push(
      'playlists'
    )
  },
  methods: {
    handlePlaylistsImportComplete (
      {
        playlists
      }
    ) {
      this.playlists = [
        ...playlists
      ]

      this.processingPhases.push(
        'tracks'
      )
    },
    handlePlaylistsTracksImportComplete (
      {
        successPlaylists
      }
    ) {
      this.$emit(
        'complete',
        {
          successPlaylists
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
