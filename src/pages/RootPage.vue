<template>
  <TheBrowserTabs
    v-if="isRenderBrowserTabs"
  />
  <TheAuthentication
    v-else
  />
</template>

<script>
import {
  defineAsyncComponent
} from 'vue'
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'

const TheBrowserTabs =
  defineAsyncComponent(
    () => import(
      '@/components/layout/TheBrowserTabs.vue'
    )
  )
const TheAuthentication =
  defineAsyncComponent(
    () => import(
      '@/components/layout/TheAuthentication.vue'
    )
  )

export default {
  name: 'RootPage',
  components: {
    TheBrowserTabs,
    TheAuthentication
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id',
        isProfileAnonymous: 'isAnonymous'
      }
    ),
    isRenderBrowserTabs () {
      return (
        this.isProfileAnonymous ||
          this.profileId
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
