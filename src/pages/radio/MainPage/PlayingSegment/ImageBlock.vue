<template>
  <div class="playing-image-block">
    <BaseImage
      class="playing-image"
      model="track"
      :image="imageData?.large"
    />
  </div>
</template>

<script>
import BaseImage from '@/components/images/BaseImage.vue'

export default {
  name: 'ImageBlock',
  components: {
    BaseImage
  },
  props: {
    trackData: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageData () {
      return this.trackData.image
    }
  }
}
</script>

<style lang="sass" scoped>
.playing-image-block
  @extend .d-flex, .justify-content-center
  background: black

.playing-image
  border-left: $borderInverted
  border-right: $borderInverted
  height: 325px
  min-width: 325px
</style>
