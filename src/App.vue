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
import {
  defineAsyncComponent
} from 'vue'
const RootPageLayout =
  defineAsyncComponent(
    () => import(
      './views/layout/RootPageLayout.vue'
    )
  )
const AboutPageLayout =
  defineAsyncComponent(
    () => import(
      './views/layout/AboutPageLayout.vue'
    )
  )
const DefaultPageLayout =
  defineAsyncComponent(
    () => import(
      './views/layout/DefaultPageLayout.vue'
    )
  )

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
