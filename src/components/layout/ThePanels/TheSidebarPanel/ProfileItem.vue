<template>
  <a class="item main-sidebar-item">
    <div class="main-sidebar-item-icon-container">
      <BaseImage
        class="circular sidebar-avatar"
        :image="avatar"
      />
    </div>

    <div class="main-sidebar-item-content-container">
      <BaseHeader
        tag="h4"
        :text="nickname"
      />
    </div>
  </a>
</template>

<script>
import { mapState } from 'vuex'
import BaseImage from '@/BaseImage.vue'
import BaseHeader from '@/BaseHeader.vue'

export default {
  name: 'ProfileItem',
  components: {
    BaseImage,
    BaseHeader
  },
  data () {
    return {
      defaultAvatar:
        'https://fomantic-ui.com/images' +
        '/wireframe/square-image.png'
    }
  },
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    avatar () {
      return (
        this.profileInfo.avatar ||
          this.defaultAvatar
      )
    },
    nickname () {
      return this.profileInfo.nickname
    }
  }
}
</script>

<style lang="sass" scoped>
.sidebar-avatar
  @extend .object-fit-cover
  width: 25px
  height: 25px
</style>
