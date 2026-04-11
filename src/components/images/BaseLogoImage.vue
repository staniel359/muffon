<template>
  <BaseImage
    class="base-logo-image"
    :image="logo"
    is-plain
  />
</template>

<script>
import BaseImage from '@/components/images/BaseImage.vue'
import logoSmall from '@/assets/images/logo_sm.png'
import logoExtraSmall from '@/assets/images/logo_xs.png'

export default {
  name: 'BaseLogoImage',
  components: {
    BaseImage
  },
  props: {
    size: {
      type: String,
      default: 'small'
    }
  },
  data () {
    return {
      imagesSizesData: {
        small: logoSmall,
        extrasmall: logoExtraSmall
      }
    }
  },
  computed: {
    logo () {
      return this.imagesSizesData[this.size]
    }
  }
}
</script>

<style lang="sass" scoped></style>
