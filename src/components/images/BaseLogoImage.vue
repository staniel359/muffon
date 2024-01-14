<template>
  <BaseImage
    class="base-logo-image"
    :image="logo"
    is-plain
  />
</template>

<script>
import BaseImage from '@/components/images/BaseImage.vue'
import logo from '@/assets/images/logo.png'
import logoExtraSmall from '@/assets/images/logo_xs.png'

export default {
  name: 'BaseLogoImage',
  components: {
    BaseImage
  },
  props: {
    isExtraSmall: Boolean
  },
  computed: {
    logo () {
      if (this.isExtraSmall) {
        return logoExtraSmall
      } else {
        return logo
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
