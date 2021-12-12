<template>
  <a
    class="item main-sidebar-item"
    @click="handleClick"
  >
    <div class="main-sidebar-item-icon-container">
      <i class="sign out grey icon"></i>
    </div>

    <div class="main-sidebar-item-content-container">
      <BaseHeader
        tag="h4"
        :text="logoutText"
      />
    </div>
  </a>
</template>

<script>
import BaseHeader from '@/BaseHeader.vue'
import { updateStore } from '#/actions'

export default {
  name: 'LogoutItem',
  components: {
    BaseHeader
  },
  computed: {
    logoutText () {
      return this.$t(
        'layout.sidebar.logout'
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
