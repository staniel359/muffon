<template>
  <Component
    :is="component"
    :class="{
      disabled: isDeleted
    }"
    :playlist-id="playlistId"
    :tracks="tracks"
    :playlist-track-ids="playlistTrackIds"
    :pagination-item="paginationItem"
    @success="handleSuccess"
    @error="handleError"
  >
    <template
      #default="slotProps"
    >
      <BaseDeletedSection
        v-if="isDeleted"
        model="playlist"
      />
      <ContentBlock
        v-else
        :playlist-data="playlistData"
        :is-loading="slotProps.isLoading"
        :is-success="isSuccess"
        :is-error="isError"
      />
    </template>
  </Component>
</template>

<script>
import BaseCreatePlaylistTracksContainer
  from '@/components/containers/playlist/tracks/BaseCreatePlaylistTracksContainer.vue'
import BaseDeletePlaylistTracksContainer
  from '@/components/containers/playlist/tracks/BaseDeletePlaylistTracksContainer.vue'
import BaseDeletedSection from '@/components/sections/BaseDeletedSection.vue'
import ContentBlock from './PlaylistItem/ContentBlock.vue'

export default {
  name: 'PlaylistItem',
  components: {
    BaseCreatePlaylistTracksContainer,
    BaseDeletePlaylistTracksContainer,
    BaseDeletedSection,
    ContentBlock
  },
  inject: {
    findPaginationItem: {
      default: () => false
    }
  },
  props: {
    playlistData: {
      type: Object,
      required: true
    },
    tracks: Array
  },
  data () {
    return {
      isSuccess: false,
      isError: false,
      playlistTrackIds: []
    }
  },
  computed: {
    component () {
      if (this.isRenderDeleteContainer) {
        return 'BaseDeletePlaylistTracksContainer'
      } else {
        return 'BaseCreatePlaylistTracksContainer'
      }
    },
    isRenderDeleteContainer () {
      return (
        !this.isDeleted &&
          this.playlistTrackIds.length
      )
    },
    playlistId () {
      return this.playlistData.id.toString()
    },
    paginationItem () {
      return this.findPaginationItem(
        {
          uuid: this.uuid
        }
      )
    },
    uuid () {
      return this.playlistData.uuid
    },
    isDeleted () {
      return !!this.playlistData.isDeleted
    }
  },
  beforeMount () {
    this.playlistTrackIds = (
      this.playlistData.playlist_track_ids || []
    )
  },
  methods: {
    handleSuccess (
      value
    ) {
      this.isSuccess = true
      this.isError = false

      this.playlistTrackIds = value
    },
    handleError () {
      this.isError = true
      this.isSuccess = false
    }
  }
}
</script>

<style lang="sass" scoped>
::v-deep(.progress)
  margin-top: 1em !important

::v-deep(.error-message)
  margin-top: 1em !important
</style>
