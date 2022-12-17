<template>
  <BaseSidebarItem
    icon="logOut"
    :text="logoutText"
    @click="handleClick"
  />
</template>

<script>
import {
  ipcRenderer
} from 'electron'
import BaseSidebarItem from '@/components/BaseSidebarItem.vue'

export default {
  name: 'LogoutItem',
  components: {
    BaseSidebarItem
  },
  computed: {
    logoutText () {
      return this.$t(
        'actions.logout'
      )
    }
  },
  methods: {
    handleClick () {
      this.logout()
    },
    logout () {
      ipcRenderer.send(
        'logout'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
