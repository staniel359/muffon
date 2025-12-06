<template>
  <BaseSidebarItem
    icon="logIn"
    :text="text"
    @click="handleClick"
  />
</template>

<script>
import BaseSidebarItem from '@/components/BaseSidebarItem.vue'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'LoginItem',
  components: {
    BaseSidebarItem
  },
  computed: {
    text () {
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
