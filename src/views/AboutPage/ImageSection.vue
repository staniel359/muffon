<template>
  <BaseImage
    :image="image"
  />
</template>

<script>
import BaseImage from '*/components/images/BaseImage.vue'

export default {
  name: 'ImageSection',
  components: {
    BaseImage
  },
  computed: {
    image () {
      return require(
        '*/../public/logo.png'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
