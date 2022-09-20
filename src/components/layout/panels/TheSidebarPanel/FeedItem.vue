<template>
  <BaseSidebarItem
    icon="newspaper"
    :text="feedText"
    :link="feedLink"
  />
</template>

<script>
import BaseSidebarItem from '@/components/BaseSidebarItem.vue'
import {
  feed as formatFeedLink
} from '@/helpers/formatters/links'

export default {
  name: 'FeedItem',
  components: {
    BaseSidebarItem
  },
  computed: {
    feedText () {
      return this.$t(
        'navigation.feed'
      )
    },
    feedLink () {
      return formatFeedLink()
    }
  }
}
</script>

<style lang="sass" scoped></style>
