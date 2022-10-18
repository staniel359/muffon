<template>
  <BaseVideoPlaylistPageContainer
    ref="page"
    :playlist-id="playlistId"
  >
    <template #default="pageSlotProps">
      <div
        :class="[
          'ui raised segments',
          'main-segment-container',
          'main-page-segment-container'
        ]"
      >
        <InfoSegment
          :playlist-data="pageSlotProps.playlistData"
        />

        <VideosSegment
          :playlist-id="playlistId"
        />
      </div>
    </template>
  </BaseVideoPlaylistPageContainer>
</template>

<script>
import BaseVideoPlaylistPageContainer
  from '@/components/containers/pages/videoPlaylist/BaseVideoPlaylistPageContainer.vue'
import InfoSegment from './MainPage/InfoSegment.vue'
import VideosSegment from './MainPage/VideosSegment.vue'

export default {
  name: 'MainPage',
  components: {
    BaseVideoPlaylistPageContainer,
    InfoSegment,
    VideosSegment
  },
  props: {
    playlistId: String
  }
}
</script>

<style lang="sass" scoped></style>
