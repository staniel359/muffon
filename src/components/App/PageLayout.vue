<template>
  <TheDarkModeObserver />

  <template
    v-if="currentRouteName"
  >
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
</template>

<script>
import {
  defineAsyncComponent
} from 'vue'
import TheDarkModeObserver
  from '@/components/layout/observers/TheDarkModeObserver.vue'

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
    TheDarkModeObserver,
    RootPageLayout,
    AboutPageLayout,
    DefaultPageLayout
  },
  computed: {
    currentRouteName () {
      return this.$route.name
    },
    isRootPage () {
      return (
        this.currentRouteName === 'RootPage'
      )
    },
    isAboutPage () {
      return (
        this.currentRouteName === 'AboutPage'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
