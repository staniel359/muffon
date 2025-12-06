<template>
  <BaseSidebarItem
    icon="bookmark"
    :text="text"
    :link-data="linkData"
  />
</template>

<script>
import BaseSidebarItem from '@/components/BaseSidebarItem.vue'
import {
  main as formatBookmarksLinkData
} from '@/helpers/formatters/links/bookmarks'

export default {
  name: 'BookmarksItem',
  components: {
    BaseSidebarItem
  },
  computed: {
    text () {
      return this.$t(
        'navigation.bookmarks'
      )
    },
    linkData () {
      return formatBookmarksLinkData()
    }
  }
}
</script>

<style lang="sass" scoped></style>
