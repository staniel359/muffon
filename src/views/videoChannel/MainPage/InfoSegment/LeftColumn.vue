<template>
  <div class="left-column">
    <BaseZoomableImage
      model="profile"
      size="medium"
      :image-data="imageData"
      is-circular
    />

    <div class="options-container">
      <BaseVideoChannelOptionsDropdown
        :channel-data="channelData"
        is-with-share-option
      />
    </div>
  </div>
</template>

<script>
import BaseZoomableImage from '@/components/images/BaseZoomableImage.vue'
import BaseVideoChannelOptionsDropdown
  from '@/components/dropdowns/videoChannel/BaseVideoChannelOptionsDropdown.vue'

export default {
  name: 'LeftColumn',
  components: {
    BaseZoomableImage,
    BaseVideoChannelOptionsDropdown
  },
  props: {
    channelData: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageData () {
      return this.channelData.image
    }
  }
}
</script>

<style lang="sass" scoped>
.left-column
  width: 120px

.options-container
  @extend .text-align-right
  margin-top: 0.5em
</style>
