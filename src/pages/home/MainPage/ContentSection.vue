<template>
  <BaseLogoSection />

  <BaseHeader
    class="welcome-message"
    tag="h1"
    :text="welcomeText"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseLogoSection from '@/components/sections/BaseLogoSection.vue'
import BaseHeader from '@/components/BaseHeader.vue'

export default {
  name: 'ContentSection',
  components: {
    BaseLogoSection,
    BaseHeader
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileInfo: 'info'
      }
    ),
    welcomeText () {
      return this.$t(
        'messages.welcome',
        {
          profileNickname:
            this.profileNicknameConditional
        }
      )
    },
    profileNicknameConditional () {
      return (
        this.profileNickname ||
          this.anonymousNickname
      )
    },
    profileNickname () {
      return this.profileInfo?.nickname
    },
    anonymousNickname () {
      return this.$t(
        'anonymous.nickname'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.welcome-message
  @extend .text-color-white
  margin-top: 0.25em !important
</style>
