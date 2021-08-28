<template>
  <TheBrowserTabs
    v-if="isProfileLoggedIn"
  />
  <TheAuthentication v-else />
</template>

<script>
import { mapState } from 'vuex'
import { ipcRenderer } from 'electron'
import TheBrowserTabs from '@/layout/TheBrowserTabs.vue'
import TheAuthentication from '@/layout/TheAuthentication.vue'

export default {
  name: 'RootPage',
  components: {
    TheBrowserTabs,
    TheAuthentication
  },
  computed: {
    ...mapState('profile', {
      isProfileLoggedIn: 'isLoggedIn'
    })
  },
  watch: {
    isProfileLoggedIn: {
      immediate: true,
      handler: 'handleIsProfileLoggedInChange'
    }
  },
  methods: {
    handleIsProfileLoggedInChange (value) {
      !value && this.clearTabs()
    },
    clearTabs () {
      ipcRenderer.send(
        'clear-tabs'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
