<template>
  <div ref="segment">
    <BaseAccordionContainer
      :title="findText"
      @open="handleOpen"
      @close="handleClose"
    >
      <BaseTrackSearchContainer
        v-if="isOpen"
        source="youtube"
        :scope="scope"
        :query="query"
      >
        <template #default="slotProps">
          <VideoSelect
            :is-loading="slotProps.isLoading"
            :is-error="slotProps.isError"
            :videos="slotProps[scope]"
          />
        </template>
      </BaseTrackSearchContainer>

      <VideoData
        v-if="selectedVideoData"
        :key="key"
        :selected-video-data="selectedVideoData"
      />
    </BaseAccordionContainer>
  </div>
</template>

<script>
import BaseAccordionContainer
  from '@/components/containers/BaseAccordionContainer.vue'
import BaseTrackSearchContainer
  from '@/components/containers/track/BaseTrackSearchContainer.vue'
import VideoSelect from './VideoSegment/VideoSelect.vue'
import VideoData from './VideoSegment/VideoData.vue'
import {
  generateKey
} from '@/helpers/utils'
import {
  focusOnSegment
} from '@/helpers/actions/layout'

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
      isOpen: false,
      scope: 'videos'
    }
  },
  computed: {
    findText () {
      return this.$t(
        'actions.find.videos'
      )
    }
  },
  watch: {
    selectedVideoData:
      'handleSelectedVideoDataChange'
  },
  methods: {
    handleOpen () {
      this.isOpen = true

      this.focus()
    },
    handleClose () {
      this.isOpen = false
      this.selectedVideoData = null
    },
    handleSelectedVideoDataChange (
      value
    ) {
      if (value) {
        this.key = generateKey()

        this.focus()
      }
    },
    setSelectedVideoData (
      value
    ) {
      this.selectedVideoData = value
    },
    focus () {
      focusOnSegment(
        this.$refs.segment
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
