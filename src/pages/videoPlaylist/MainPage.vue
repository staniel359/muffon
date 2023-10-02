<template>
  <BaseVideoPlaylistPageContainer
    ref="page"
    :key="refreshKey"
    :playlist-id="playlistId"
  >
    <template
      #default="slotProps"
    >
      <BaseSegmentsContainer
        class="main-page-segment-container"
      >
        <InfoSegment
          :playlist-data="slotProps.playlistData"
        />

        <ExtraSegment
          :view-id="viewId"
          :scope="scope"
        />

        <VideosSegment
          :key="key"
          :playlist-id="playlistId"
          :scope="scope"
          :view-id="viewId"
          :limit="limit"
        />
      </BaseSegmentsContainer>
    </template>
  </BaseVideoPlaylistPageContainer>
</template>

<script>
import BaseVideoPlaylistPageContainer
  from '@/components/containers/pages/videoPlaylist/BaseVideoPlaylistPageContainer.vue'
import BaseSegmentsContainer
  from '@/components/containers/segments/BaseSegmentsContainer.vue'
import InfoSegment from './MainPage/InfoSegment.vue'
import ExtraSegment from './MainPage/ExtraSegment.vue'
import VideosSegment from './MainPage/VideosSegment.vue'
import viewChangeMixin from '@/mixins/viewChangeMixin'
import pageMixin from '@/mixins/pageMixin'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'MainPage',
  components: {
    BaseVideoPlaylistPageContainer,
    BaseSegmentsContainer,
    InfoSegment,
    ExtraSegment,
    VideosSegment
  },
  mixins: [
    viewChangeMixin,
    pageMixin
  ],
  props: {
    playlistId: String
  },
  data () {
    return {
      key: null,
      scope: 'videos',
      viewId: 'simple'
    }
  },
  watch: {
    viewId: 'handleViewIdChange'
  },
  methods: {
    handleViewIdChange () {
      this.key = generateKey()
    }
  }
}
</script>

<style lang="sass" scoped></style>
