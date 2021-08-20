<template>
  <BaseAccordionContainer
    :title="textFormatted"
    @open="handleOpen"
  >
    <BaseTrackSearchContainer
      v-if="isOpen"
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
  </BaseAccordionContainer>
</template>

<script>
import BaseAccordionContainer from '@/containers/BaseAccordionContainer.vue'
import BaseTrackSearchContainer
  from '@/containers/track/search/BaseTrackSearchContainer.vue'
import VideoSelect from './VideoSegment/VideoSelect.vue'
import VideoData from './VideoSegment/VideoData.vue'
import { generateKey } from '#/utils'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'VideoSegment',
  components: {
    BaseAccordionContainer,
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
      selectedVideoData: null,
      isOpen: false
    }
  },
  computed: {
    textFormatted () {
      return localize(
        'pages.track.videos.find'
      )
    }
  },
  watch: {
    selectedVideoData: 'handleSelectedVideoDataChange'
  },
  methods: {
    handleOpen () {
      this.isOpen = true
    },
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
