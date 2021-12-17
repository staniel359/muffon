<template>
  <BaseLinkContainer
    class="item main-sidebar-item"
    :link="profileMainLink"
  >
    <div class="main-sidebar-item-icon-container">
      <BaseImage
        class="profile-image circular bordered"
        model="profile"
        :image="imageData?.extrasmall"
      />
    </div>

    <div class="main-sidebar-item-content-container">
      <BaseHeader
        tag="h4"
        :text="nickname"
      />
    </div>
  </BaseLinkContainer>
</template>

<script>
import { mapState } from 'vuex'
import BaseLinkContainer from '@/containers/links/BaseLinkContainer.vue'
import BaseImage from '@/images/BaseImage.vue'
import BaseHeader from '@/BaseHeader.vue'
import { main as formatProfileMainLink } from '#/formatters/links/profile'

export default {
  name: 'ProfileItem',
  components: {
    BaseLinkContainer,
    BaseImage,
    BaseHeader
  },
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    imageData () {
      return this.profileInfo.image
    },
    nickname () {
      return this.profileInfo.nickname
    },
    profileMainLink () {
      return formatProfileMainLink({
        profileId: this.profileId
      })
    },
    profileId () {
      return this.profileInfo.id
    }
  }
}
</script>

<style lang="sass" scoped>
.profile-image
  width: 25px
  height: 25px
</style>
