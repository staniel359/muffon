<template>
  <div class="track-image-container">
    <BaseImage
      :image="image"
      isRounded
      isBordered
    />
  </div>
</template>

<script>
import BaseImage from '@/BaseImage.vue'

export default {
  name: 'TrackImage',
  components: {
    BaseImage
  },
  props: {
    imageData: {
      type: Object,
      required: true
    }
  },
  computed: {
    image () {
      return this.imageData.extrasmall
    }
  }
}
</script>

<style lang="sass" scoped>
.track-image-container
  margin-left: $trackContentMarginWidth
  .image
    @extend .object-fit-cover
    width: 30px
    height: 30px
</style>
