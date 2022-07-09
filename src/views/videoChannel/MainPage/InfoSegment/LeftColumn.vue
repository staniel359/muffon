<template>
  <div class="left-column">
    <BaseZoomableImage
      model="profile"
      size="medium"
      :image-data="imageData"
      is-circular
    />
  </div>
</template>

<script>
import BaseZoomableImage from '*/components/images/BaseZoomableImage.vue'

export default {
  name: 'LeftColumn',
  components: {
    BaseZoomableImage
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
</style>
