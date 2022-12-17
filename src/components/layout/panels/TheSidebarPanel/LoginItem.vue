<template>
  <BaseSidebarItem
    icon="logIn"
    :text="loginText"
    @click="handleClick"
  />
</template>

<script>
import BaseSidebarItem from '@/components/BaseSidebarItem.vue'
import {
  updateGlobal as updateGlobalStore
} from '@/helpers/actions/store'

export default {
  name: 'LoginItem',
  components: {
    BaseSidebarItem
  },
  computed: {
    loginText () {
      return this.$t(
        'actions.login'
      )
    }
  },
  methods: {
    handleClick () {
      updateGlobalStore(
        {
          'profile.isAnonymous': false
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
