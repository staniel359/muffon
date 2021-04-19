<template>
  <div class="ui segment main-segment-container main-page-segment-container">
    Home
  </div>
</template>

<script>
import pageLoadableMixin from '#/mixins/pageLoadable'
import { setNavigationSections } from '#/actions/layout'
import { homePage as formatHomePageNavigation } from '#/formatters/navigation'

export default {
  name: 'HomePage',
  mixins: [
    pageLoadableMixin
  ],
  computed: {
    navigationSections () {
      return formatHomePageNavigation()
    }
  },
  mounted () {
    this.setNavigation()
  },
  methods: {
    setNavigation () {
      setNavigationSections(
        this.navigationSections
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
