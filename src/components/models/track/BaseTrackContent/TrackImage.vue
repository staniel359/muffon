<template>
  <div class="track-image-container">
    <BaseImage
      class="rounded bordered"
      :image="image"
    />
  </div>
</template>

<script>
import BaseImage from '@/images/BaseImage.vue'

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
  data () {
    return {
      defaultImage:
        'https://lastfm.freetls.fastly.net/i/u/64s' +
        '/4128a6eb29f94943c9d206c08e625904.png'
    }
  },
  computed: {
    image () {
      return (
        this.imageData.extrasmall ||
          this.defaultImage
      )
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
