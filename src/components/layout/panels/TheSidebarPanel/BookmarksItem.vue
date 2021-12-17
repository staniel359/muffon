<template>
  <BaseSidebarItem
    icon="bookmark"
    :text="bookmarksText"
    :link="bookmarksLink"
  />
</template>

<script>
import BaseSidebarItem from '@/BaseSidebarItem.vue'
import { bookmarks as formatBookmarksLink } from '#/formatters/links'

export default {
  name: 'BookmarksItem',
  components: {
    BaseSidebarItem
  },
  computed: {
    bookmarksText () {
      return this.$t(
        'layout.navigation.bookmarks'
      )
    },
    bookmarksLink () {
      return formatBookmarksLink()
    }
  }
}
</script>

<style lang="sass" scoped></style>
