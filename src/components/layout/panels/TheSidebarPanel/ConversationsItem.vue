<template>
  <BaseSidebarItem
    icon="conversation"
    :text="text"
    :link-data="linkData"
  />
</template>

<script>
import BaseSidebarItem from '@/components/BaseSidebarItem.vue'
import {
  main as formatConversationsLinkData
} from '@/helpers/formatters/links/conversations'

export default {
  name: 'ConversationsItem',
  components: {
    BaseSidebarItem
  },
  computed: {
    text () {
      return this.$t(
        'navigation.conversations'
      )
    },
    linkData () {
      return formatConversationsLinkData()
    }
  }
}
</script>

<style lang="sass" scoped></style>
