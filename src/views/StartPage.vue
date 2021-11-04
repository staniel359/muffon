<template>
  <div class="start-page-container">
    <BaseHeader
      class="main-app-title"
      tag="h1"
      text="muffon"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BaseHeader from '@/BaseHeader.vue'
import {
  startPage as formatStartPageNavigation
} from '#/formatters/navigation'
import { updateTab } from '#/actions'
import { startPage as formatStartPageTab } from '#/formatters/tabs'

export default {
  name: 'StartPage',
  components: {
    BaseHeader
  },
  computed: {
    ...mapState('profile', {
      profileLanguage: 'language'
    })
  },
  watch: {
    profileLanguage: {
      immediate: true,
      handler: 'handleProfileLanguageChange'
    }
  },
  methods: {
    ...mapActions('layout', [
      'setNavigationSections'
    ]),
    handleProfileLanguageChange () {
      this.setNavigation()
    },
    setNavigation () {
      this.setNavigationSections(
        formatStartPageNavigation()
      )

      updateTab(
        formatStartPageTab()
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.start-page-container
  @extend .d-flex, .flex-column, .align-items-center
  margin-top: 20vh
</style>
