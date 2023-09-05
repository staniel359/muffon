<template>
  <BaseSidebarItem
    icon="home"
    :text="homeText"
    :link="homeLink"
  />
</template>

<script>
import BaseSidebarItem from '@/components/BaseSidebarItem.vue'
import {
  home as formatHomeLink
} from '@/helpers/formatters/links'

export default {
  name: 'HomeItem',
  components: {
    BaseSidebarItem
  },
  computed: {
    homeText () {
      return this.$t(
        'navigation.home'
      )
    },
    homeLink () {
      return formatHomeLink()
    }
  }
}
</script>

<style lang="sass" scoped></style>
