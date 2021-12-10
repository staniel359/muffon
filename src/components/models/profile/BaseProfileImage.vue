<template>
  <BaseImage
    class="circular bordered main-profile-image"
    :image="imageFormatted"
  />
</template>

<script>
import BaseImage from '@/images/BaseImage.vue'

export default {
  name: 'BaseProfileImage',
  components: {
    BaseImage
  },
  props: {
    image: String
  },
  data () {
    return {
      defaultImage:
        'https://lastfm.freetls.fastly.net/i/u/300x300' +
        '/818148bf682d429dc215c1705eb27b98.png'
    }
  },
  computed: {
    imageFormatted () {
      return (
        this.image ||
          this.defaultImage
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
