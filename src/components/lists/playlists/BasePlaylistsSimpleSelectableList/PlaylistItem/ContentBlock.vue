<template>
  <BaseImage
    class="rounded bordered"
    model="playlist"
    :image="imageData?.extrasmall"
  />

  <div class="content">
    <BaseHeader
      class="link"
      tag="h4"
      :text="playlistTitle"
    />

    <TracksCountSection
      :tracks-count="tracksCount"
    />
  </div>

  <div class="icon-container">
    <BaseIcon
      :is-loading="isLoading"
      :icon="icon"
    />
  </div>
</template>

<script>
import BaseImage from '*/components/images/BaseImage.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import TracksCountSection from './ContentBlock/TracksCountSection.vue'
import BaseIcon from '*/components/BaseIcon.vue'

export default {
  name: 'ContentBlock',
  components: {
    BaseImage,
    BaseHeader,
    TracksCountSection,
    BaseIcon
  },
  props: {
    playlistData: {
      type: Object,
      required: true
    },
    isLoading: Boolean,
    isSuccess: Boolean,
    isError: Boolean
  },
  computed: {
    imageData () {
      return this.playlistData.image
    },
    playlistTitle () {
      return this.playlistData.title
    },
    tracksCount () {
      return this.playlistData.tracks_count
    },
    icon () {
      if (this.isSuccess) {
        return 'green check'
      } else if (this.isError) {
        return 'red close'
      } else {
        return null
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.icon-container
  @extend .d-flex, .align-items-center, .justify-content-center
  width: 20px
  height: 20px
  &.icon
    @extend .no-padding
</style>
