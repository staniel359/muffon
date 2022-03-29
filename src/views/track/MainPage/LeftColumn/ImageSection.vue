<template>
  <div class="main-image-container">
    <BaseImage
      class="rounded bordered track-image"
      model="track"
      :image="imageData?.medium"
    />
  </div>
</template>

<script>
import BaseImage from '*/components/images/BaseImage.vue'

export default {
  name: 'ImageSection',
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

<style lang="sass" scoped></style>
