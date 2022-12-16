<template>
  <div class="home-page-container main-page-segment-container">
    <BaseLogoTitleSection />

    <BaseHeader
      class="welcome-message"
      tag="h2"
      :text="welcomeText"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseLogoTitleSection
  from '@/components/sections/BaseLogoTitleSection.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import {
  home as formatHomePageNavigation
} from '@/helpers/formatters/navigation'
import formatHomePageTab from '@/helpers/formatters/tabs/home'
import navigationMixin from '@/mixins/navigationMixin'

export default {
  name: 'HomePage',
  components: {
    BaseLogoTitleSection,
    BaseHeader
  },
  mixins: [
    navigationMixin
  ],
  computed: {
    ...mapState(
      profileStore,
      {
        profileInfo: 'info'
      }
    ),
    navigationSections () {
      return formatHomePageNavigation()
    },
    tabData () {
      return formatHomePageTab()
    },
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
  },
  mounted () {
    this.setNavigation()

    this.isRefreshNavigation = true
  }
}
</script>

<style lang="sass" scoped>
.home-page-container
  @extend .d-flex, .flex-column, .align-items-center
  padding-top: 5vh
  height: 70vh

.welcome-message
  @extend .text-color-white
  margin-top: 0.5em !important
</style>
