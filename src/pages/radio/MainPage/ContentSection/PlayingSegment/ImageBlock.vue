<template>
  <div class="playing-image-block center-aligned">
    <BaseImage
      class="playing-image border-inverted no-border-top no-border-bottom"
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
  background: black

.playing-image
  height: 350px
  min-width: 350px
</style>
