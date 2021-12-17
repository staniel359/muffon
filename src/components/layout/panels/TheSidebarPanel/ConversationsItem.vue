<template>
  <BaseSidebarItem
    icon="comments"
    :text="conversationsText"
    :link="conversationsLink"
  />
</template>

<script>
import BaseSidebarItem from '@/BaseSidebarItem.vue'
import {
  main as formatConversationsLink
} from '#/formatters/links/conversations'

export default {
  name: 'ConversationsItem',
  components: {
    BaseSidebarItem
  },
  computed: {
    conversationsText () {
      return this.$t(
        'layout.navigation.conversations'
      )
    },
    conversationsLink () {
      return formatConversationsLink()
    }
  }
}
</script>

<style lang="sass" scoped></style>
