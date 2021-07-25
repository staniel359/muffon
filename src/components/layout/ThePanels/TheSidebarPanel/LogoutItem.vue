<template>
  <a
    class="item main-sidebar-item"
    @click="handleClick"
  >
    <div class="main-sidebar-item-icon-container">
      <i class="sign out large grey icon"></i>
    </div>

    <div class="main-sidebar-item-content-container">
      <BaseHeader
        tag="h4"
        :text="textFormatted"
      />
    </div>
  </a>
</template>

<script>
import BaseHeader from '@/BaseHeader.vue'
import { setGlobalData } from '#/actions'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'LogoutItem',
  components: {
    BaseHeader
  },
  computed: {
    textFormatted () {
      return localize(
        'layout.sidebar.logout'
      )
    }
  },
  methods: {
    handleClick () {
      setGlobalData({
        'profile.isLoggedIn': false,
        'profile.isRemember': false
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
