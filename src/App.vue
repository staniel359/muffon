<template>
  <TheStoreObserver />

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
import TheStoreObserver
  from '@/components/layout/observers/TheStoreObserver.vue'

const RootPageLayout =
  defineAsyncComponent(
    () => import(
      './pages/layout/RootPageLayout.vue'
    )
  )
const AboutPageLayout =
  defineAsyncComponent(
    () => import(
      './pages/layout/AboutPageLayout.vue'
    )
  )
const DefaultPageLayout =
  defineAsyncComponent(
    () => import(
      './pages/layout/DefaultPageLayout.vue'
    )
  )

export default {
  name: 'App',
  components: {
    TheStoreObserver,
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
