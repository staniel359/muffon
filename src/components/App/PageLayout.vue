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
      './PageLayout/RootPageLayout.vue'
    )
  )
const AboutPageLayout =
  defineAsyncComponent(
    () => import(
      './PageLayout/AboutPageLayout.vue'
    )
  )
const DefaultPageLayout =
  defineAsyncComponent(
    () => import(
      './PageLayout/DefaultPageLayout.vue'
    )
  )

export default {
  name: 'PageLayout',
  components: {
    RootPageLayout,
    AboutPageLayout,
    DefaultPageLayout
  },
  computed: {
    isRootPage () {
      return (
        this.currentPath === '/'
      )
    },
    currentPath () {
      return this.$route.path
    },
    isAboutPage () {
      return (
        this.currentPath === '/about'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
