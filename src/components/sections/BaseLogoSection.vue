<template>
  <BaseImage
    class="main-logo-image"
    :image="logo"
    is-plain
  />
</template>

<script>
import BaseImage from '@/components/images/BaseImage.vue'
import logo from '@/assets/images/logo.png'

export default {
  name: 'BaseLogoSection',
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
