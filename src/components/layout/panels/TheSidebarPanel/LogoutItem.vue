<template>
  <BaseSidebarItem
    icon="logOut"
    :text="text"
    @click="handleClick"
  />
</template>

<script>
import BaseSidebarItem from '@/components/BaseSidebarItem.vue'

export default {
  name: 'LogoutItem',
  components: {
    BaseSidebarItem
  },
  computed: {
    text () {
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
      window
        .mainProcess
        .sendCommand(
          'logout'
        )
    }
  }
}
</script>

<style lang="sass" scoped></style>
