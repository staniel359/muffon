<template>
  <BaseSidebarItem
    icon="sign out"
    :text="logoutText"
    @click="handleClick"
  />
</template>

<script>
import BaseSidebarItem from '*/components/BaseSidebarItem.vue'
import { updateStore } from '*/helpers/actions'

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
      updateStore({
        'profile.isLoggedIn': false,
        'profile.isRemember': false
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
