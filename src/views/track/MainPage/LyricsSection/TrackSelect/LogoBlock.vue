<template>
  <BaseImage
    class="genius-logo"
    :image="geniusLogo"
    isRounded
  />
</template>

<script>
import BaseImage from '@/BaseImage.vue'

export default {
  name: 'LogoBlock',
  components: {
    BaseImage
  },
  computed: {
    geniusLogo () {
      return (
        'https://assets.genius.com' +
        '/images/apple-touch-icon.png'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.genius-logo
  width: 20px
  height: 20px
  margin-right: 10px
</style>
