<template>
  <BaseImage
    class="base-logo-image"
    :image="logo"
    is-plain
  />
</template>

<script>
import BaseImage from '@/components/images/BaseImage.vue'
import logoMedium from '@/assets/images/logo_sm.png'
import logoSmall from '@/assets/images/logo_xs.png'

export default {
  name: 'BaseLogoImage',
  components: {
    BaseImage
  },
  props: {
    isSmall: Boolean
  },
  computed: {
    logo () {
      if (this.isSmall) {
        return logoSmall
      } else {
        return logoMedium
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
