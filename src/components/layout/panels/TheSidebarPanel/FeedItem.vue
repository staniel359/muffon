<template>
  <BaseSidebarItem
    icon="feed"
    :text="text"
    :link-data="linkData"
  />
</template>

<script>
import BaseSidebarItem from '@/components/BaseSidebarItem.vue'
import {
  feed as formatFeedLinkData
} from '@/helpers/formatters/links'

export default {
  name: 'FeedItem',
  components: {
    BaseSidebarItem
  },
  computed: {
    text () {
      return this.$t(
        'navigation.feed'
      )
    },
    linkData () {
      return formatFeedLinkData()
    }
  }
}
</script>

<style lang="sass" scoped></style>
