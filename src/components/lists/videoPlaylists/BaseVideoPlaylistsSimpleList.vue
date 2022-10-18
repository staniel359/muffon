<template>
  <BaseListContainer
    class="selection"
  >
    <VideoPlaylistItem
      v-for="playlistData in playlists"
      :key="playlistData.uuid"
      :playlist-data="playlistData"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer
  from '@/components/containers/lists/BaseListContainer.vue'
import VideoPlaylistItem
  from './BaseVideoPlaylistsSimpleList/VideoPlaylistItem.vue'

export default {
  name: 'BaseVideoPlaylistsSimpleList',
  components: {
    BaseListContainer,
    VideoPlaylistItem
  },
  props: {
    playlists: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
