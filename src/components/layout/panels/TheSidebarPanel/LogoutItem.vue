<template>
  <BaseSidebarItem
    icon="sign out"
    :text="logoutText"
    @click="handleClick"
  />
</template>

<script>
import BaseSidebarItem from '*/components/BaseSidebarItem.vue'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'

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
      updateGlobalStore(
        {
          'profile.isLoggedIn': false,
          'profile.isRemember': false
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
