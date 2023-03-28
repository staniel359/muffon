<template>
  <BaseImage
    :image="logo"
  />
</template>

<script>
import BaseImage from '@/components/images/BaseImage.vue'
import logo from '@/assets/images/logo.png'

export default {
  name: 'ImageSection',
  components: {
    BaseImage
  },
  computed: {
    logo () {
      return logo
    }
  }
}
</script>

<style lang="sass" scoped></style>
