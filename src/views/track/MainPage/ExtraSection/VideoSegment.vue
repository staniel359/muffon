<template>
  <div class="ui basic segments">
    <BaseTrackSearchContainer
      sourceId="youtube"
      scope="videos"
      :query="query"
    >
      <template #default="slotProps">
        <VideoSelect
          :isLoading="slotProps.isLoading"
          :isError="slotProps.isError"
          :videos="slotProps.videos"
        />
      </template>
    </BaseTrackSearchContainer>

    <VideoData
      v-if="selectedVideoData"
      :key="key"
      :selectedVideoData="selectedVideoData"
    />
  </div>
</template>

<script>
import BaseTrackSearchContainer
  from '@/containers/track/search/BaseTrackSearchContainer.vue'
import VideoSelect from './VideoSegment/VideoSelect.vue'
import VideoData from './VideoSegment/VideoData.vue'
import { generateKey } from '#/utils'

export default {
  name: 'VideoSegment',
  components: {
    BaseTrackSearchContainer,
    VideoSelect,
    VideoData
  },
  provide () {
    return {
      setSelectedVideoData: this.setSelectedVideoData
    }
  },
  props: {
    query: String
  },
  data () {
    return {
      key: null,
      selectedVideoData: null
    }
  },
  watch: {
    selectedVideoData: 'handleSelectedVideoDataChange'
  },
  methods: {
    handleSelectedVideoDataChange () {
      this.key = generateKey()
    },
    setSelectedVideoData (value) {
      this.selectedVideoData = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
