<template>
  <BaseImage
    class="circular bordered main-profile-avatar"
    :image="avatarFormatted"
  />
</template>

<script>
import BaseImage from '@/BaseImage.vue'

export default {
  name: 'BaseProfileAvatar',
  components: {
    BaseImage
  },
  props: {
    avatar: String
  },
  data () {
    return {
      defaultAvatar:
        'https://fomantic-ui.com/images' +
        '/wireframe/square-image.png'
    }
  },
  computed: {
    avatarFormatted () {
      return (
        this.avatar ||
          this.defaultAvatar
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
