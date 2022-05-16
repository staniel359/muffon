<template>
  <BaseSimpleCardContainer>
    <BaseLinkContainer
      class="card-link"
      :link="videoMainLink"
      @click="handleLinkClick"
    >
      <BaseOptionsDropdown
        :share-data="shareData"
        :is-with-share-option="isWithShareOption"
        :is-transparent="false"
      />

      <div class="main-simple-card-image-container">
        <BaseImage
          class="rounded bordered"
          model="video"
          :image="imageData?.small"
        />
      </div>

      <BaseHeader
        class="link"
        tag="h4"
        :text="videoTitle"
      />
    </BaseLinkContainer>

    <div class="content">
      <div class="description main-small-container">
        <small
          v-text="publishDate"
        />
      </div>
    </div>
  </BaseSimpleCardContainer>
</template>

<script>
import BaseSimpleCardContainer
  from '*/components/containers/cards/BaseSimpleCardContainer.vue'
import BaseLinkContainer
  from '*/components/containers/links/BaseLinkContainer.vue'
import BaseOptionsDropdown
  from '*/components/dropdowns/BaseOptionsDropdown.vue'
import BaseImage from '*/components/images/BaseImage.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import {
  main as formatVideoMainLink
} from '*/helpers/formatters/links/video'
import {
  video as formatVideoShareData
} from '*/helpers/formatters/share'

export default {
  name: 'VideoItem',
  components: {
    BaseSimpleCardContainer,
    BaseLinkContainer,
    BaseOptionsDropdown,
    BaseImage,
    BaseHeader
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
    videoMainLink () {
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
    },
    publishDate () {
      return this.videoData.publish_date
    },
    shareData () {
      return formatVideoShareData(
        this.videoData
      )
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
.main-simple-card-image-container
  padding-bottom: 75px
</style>
