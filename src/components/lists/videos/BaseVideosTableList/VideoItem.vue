<template>
  <BaseLinkContainer
    :link="videoMainLink"
    @click="handleLinkClick"
  >
    <BaseSimpleCardContainer
      :is-with-image="false"
    >
      <div class="main-simple-card-image-container">
        <BaseImage
          class="rounded bordered"
          model="video"
          :image="imageData?.small"
        />
      </div>

      <div class="content">
        <BaseHeader
          class="link"
          tag="h4"
          :text="videoTitle"
        />

        <div class="description main-small-container">
          <small
            v-text="publishDate"
          />
        </div>
      </div>
    </BaseSimpleCardContainer>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer
  from '*/components/containers/links/BaseLinkContainer.vue'
import BaseSimpleCardContainer
  from '*/components/containers/BaseSimpleCardContainer.vue'
import BaseImage from '*/components/images/BaseImage.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import {
  main as formatVideoMainLink
} from '*/helpers/formatters/links/video'

export default {
  name: 'VideoItem',
  components: {
    BaseLinkContainer,
    BaseSimpleCardContainer,
    BaseImage,
    BaseHeader
  },
  props: {
    videoData: {
      type: Object,
      required: true
    }
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
      return this.videoData.youtube_id
    },
    videoTitle () {
      return this.videoData.title
    },
    publishDate () {
      return this.videoData.publish_date
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
