<template>
  <BaseLinkContainer
    class="item main-sidebar-item"
    :link="profileMainLinkFormatted"
  >
    <div class="main-sidebar-item-icon-container">
      <BaseProfileAvatar
        class="sidebar-avatar"
        :avatar="avatar"
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
import BaseProfileAvatar from '@/models/profile/BaseProfileAvatar.vue'
import BaseHeader from '@/BaseHeader.vue'
import { profileMain as formatProfileMainLink } from '#/formatters/links'

export default {
  name: 'ProfileItem',
  components: {
    BaseLinkContainer,
    BaseProfileAvatar,
    BaseHeader
  },
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    avatar () {
      return this.profileInfo.avatar_url
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
.sidebar-avatar
  width: 25px
  height: 25px
</style>
