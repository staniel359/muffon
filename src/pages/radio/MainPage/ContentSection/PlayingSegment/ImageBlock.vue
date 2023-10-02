<template>
  <div class="background-plain-black center-aligned">
    <BaseImage
      class="playing-image border-left-inverted border-right-inverted"
      model="track"
      :image="imageData?.large"
      is-plain
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
.playing-image
  height: 350px
  min-width: 350px
</style>
