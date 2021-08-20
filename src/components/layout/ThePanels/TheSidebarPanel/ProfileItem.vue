<template>
  <BaseLinkContainer
    class="item main-sidebar-item"
    :link="profileMainLinkFormatted"
  >
    <div class="main-sidebar-item-icon-container">
      <BaseProfileImage
        class="profile-image"
        :image="image"
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
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
import BaseProfileImage from '@/models/profile/BaseProfileImage.vue'
import BaseHeader from '@/BaseHeader.vue'
import { main as formatProfileMainLink } from '#/formatters/links/profile'

export default {
  name: 'ProfileItem',
  components: {
    BaseLinkContainer,
    BaseProfileImage,
    BaseHeader
  },
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    image () {
      return this.profileInfo.image_url
    },
    nickname () {
      return this.profileInfo.nickname
    },
    profileId () {
      return this.profileInfo.id
    },
    profileMainLinkFormatted () {
      return formatProfileMainLink({
        profileId: this.profileId
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.profile-image
  width: 25px
  height: 25px
</style>
