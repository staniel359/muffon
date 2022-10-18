<template>
  <BaseSimpleCardContainer>
    <BaseLinkContainer
      class="card-link"
      :link="link"
      @click="handleLinkClick"
    >
      <BaseVideoOptionsDropdown
        :video-data="videoData"
        :is-with-share-option="isWithShareOption"
      />

      <div class="main-image-container">
        <BaseImage
          class="rounded bordered"
          model="video"
          :image="imageData?.small"
        />
      </div>

      <BaseHeader
        class="center aligned link"
        tag="h4"
        :text="videoTitle"
      />
    </BaseLinkContainer>

    <div class="center aligned content">
      <BasePublishDateSection
        class="description"
        :model-data="videoData"
      />
    </div>
  </BaseSimpleCardContainer>
</template>

<script>
import BaseSimpleCardContainer
  from '@/components/containers/cards/BaseSimpleCardContainer.vue'
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseVideoOptionsDropdown
  from '@/components/dropdowns/video/BaseVideoOptionsDropdown.vue'
import BaseImage from '@/components/images/BaseImage.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BasePublishDateSection
  from '@/components/sections/BasePublishDateSection.vue'
import {
  main as formatVideoMainLink
} from '@/helpers/formatters/links/video'

export default {
  name: 'VideoItem',
  components: {
    BaseSimpleCardContainer,
    BaseLinkContainer,
    BaseVideoOptionsDropdown,
    BaseImage,
    BaseHeader,
    BasePublishDateSection
  },
  props: {
    videoData: {
      type: Object,
      required: true
    },
    isWithShareOption: Boolean
  },
  emits: [
    'linkClick'
  ],
  computed: {
    imageData () {
      return this.videoData.image
    },
    link () {
      return formatVideoMainLink(
        {
          videoId: this.videoId
        }
      )
    },
    videoId () {
      return this.videoData.source.id
    },
    videoTitle () {
      return this.videoData.title
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.main-image-container
  padding-bottom: 75px
</style>
