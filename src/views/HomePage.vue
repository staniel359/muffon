<template>
  <div
    :class="[
      'home-page-container',
      'main-page-segment-container'
    ]"
  >
    <BaseHeader
      class="main-app-title"
      tag="h1"
      text="muffon"
    />

    home page
  </div>
</template>

<script>
import BaseHeader from '*/components/BaseHeader.vue'
import {
  home as formatHomePageNavigation
} from '*/helpers/formatters/navigation'
import {
  home as formatHomePageTab
} from '*/helpers/formatters/tabs'
import navigationMixin from '*/mixins/navigationMixin'

export default {
  name: 'HomePage',
  components: {
    BaseHeader
  },
  mixins: [
    navigationMixin
  ],
  computed: {
    navigationSections () {
      return formatHomePageNavigation()
    },
    tabData () {
      return formatHomePageTab()
    }
  },
  mounted () {
    this.setNavigation()
  }
}
</script>

<style lang="sass" scoped>
.home-page-container
  @extend .d-flex, .flex-column, .align-items-center
  padding-top: 5vh
  height: 70vh
</style>
