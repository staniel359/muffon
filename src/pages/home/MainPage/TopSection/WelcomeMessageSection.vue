<template>
  <BaseHeader
    class="main-bottom-small-section text-color-white"
    tag="h1"
    :text="welcomeText"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseHeader from '@/components/headers/BaseHeader.vue'

export default {
  name: 'WelcomeMessageSection',
  components: {
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

<style lang="sass" scoped></style>
