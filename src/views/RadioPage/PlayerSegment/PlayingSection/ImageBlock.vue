<template>
  <div class="playing-image-block">
    <BaseImage
      class="rounded bordered inverted"
      model="track"
      :image="imageData?.large"
    />
  </div>
</template>

<script>
import BaseImage from '*/components/images/BaseImage.vue'

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
  @extend .d-flex, .justify-content-center, .h-100
  background: black
  & > .image
    height: 350px
    width: 350px
</style>
