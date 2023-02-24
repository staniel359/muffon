<template>
  <RootPageLayout
    v-if="isRootPage"
  />
  <AboutPageLayout
    v-else-if="isAboutPage"
  />
  <DefaultPageLayout
    v-else
  />
</template>

<script>
import RootPageLayout from './views/layout/RootPageLayout.vue'
import AboutPageLayout from './views/layout/AboutPageLayout.vue'
import DefaultPageLayout from './views/layout/DefaultPageLayout.vue'

export default {
  name: 'App',
  components: {
    RootPageLayout,
    AboutPageLayout,
    DefaultPageLayout
  },
  computed: {
    isRootPage () {
      return (
        this.$route.path === '/'
      )
    },
    isAboutPage () {
      return (
        this.$route.path === '/about'
      )
    }
  }
}
</script>

<style lang="sass"></style>
