<template>
  <BaseVideoPlaylistPaginatedPageContainer
    :playlist-id="playlistId"
    :scope="scope"
    :limit="limit"
  >
    <template #default="slotProps">
      <BaseVideosTableList
        :videos="slotProps[scope]"
        is-with-share-option
      />
    </template>
  </BaseVideoPlaylistPaginatedPageContainer>
</template>

<script>
import BaseVideoPlaylistPaginatedPageContainer
  from '@/components/containers/pages/videoPlaylist/BaseVideoPlaylistPaginatedPageContainer.vue'
import BaseVideosTableList
  from '@/components/lists/videos/BaseVideosTableList.vue'

export default {
  name: 'VideosPage',
  components: {
    BaseVideoPlaylistPaginatedPageContainer,
    BaseVideosTableList
  },
  props: {
    playlistId: String
  },
  data () {
    return {
      limit: 40,
      scope: 'videos'
    }
  }
}
</script>

<style lang="sass" scoped></style>
