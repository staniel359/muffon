<template>
  <BaseVideoPlaylistsSimpleList
    :playlists="videoPlaylists"
    :is-with-self-icons="false"
    is-with-channel-title
    is-with-clear-button
    @link-click="handleLinkClick"
    @clear-button-click="handleClearButtonClick"
  />
</template>

<script>
import BaseVideoPlaylistsSimpleList
  from '@/components/lists/videoPlaylists/BaseVideoPlaylistsSimpleList.vue'

export default {
  name: 'VideoPlaylistsSection',
  components: {
    BaseVideoPlaylistsSimpleList
  },
  inject: [
    'deleteCollectionItem'
  ],
  props: {
    videoPlaylists: Array
  },
  emits: [
    'linkClick'
  ],
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    handleClearButtonClick (
      {
        uuid
      }
    ) {
      this.deleteCollectionItem(
        {
          collection: 'videoPlaylists',
          uuid
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
