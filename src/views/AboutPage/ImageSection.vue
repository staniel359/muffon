<template>
  <BaseImage
    :image="logo"
  />
</template>

<script>
import BaseImage from '@/components/images/BaseImage.vue'

export default {
  name: 'ImageSection',
  components: {
    BaseImage
  },
  computed: {
    logo () {
      return require(
        '@/../public/logo.png'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
