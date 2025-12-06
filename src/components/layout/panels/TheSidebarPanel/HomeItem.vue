<template>
  <BaseSidebarItem
    icon="home"
    :text="text"
    :link-data="linkData"
  />
</template>

<script>
import BaseSidebarItem from '@/components/BaseSidebarItem.vue'
import {
  home as formatHomeLinkData
} from '@/helpers/formatters/links'

export default {
  name: 'HomeItem',
  components: {
    BaseSidebarItem
  },
  computed: {
    text () {
      return this.$t(
        'navigation.home'
      )
    },
    linkData () {
      return formatHomeLinkData()
    }
  }
}
</script>

<style lang="sass" scoped></style>
