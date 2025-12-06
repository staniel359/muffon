<template>
  <BaseSidebarItem
    icon="history"
    :text="text"
    :link-data="linkData"
  />
</template>

<script>
import BaseSidebarItem from '@/components/BaseSidebarItem.vue'
import {
  main as formatHistoryLinkData
} from '@/helpers/formatters/links/history'

export default {
  name: 'HistoryItem',
  components: {
    BaseSidebarItem
  },
  computed: {
    text () {
      return this.$t(
        'navigation.history'
      )
    },
    linkData () {
      return formatHistoryLinkData()
    }
  }
}
</script>

<style lang="sass" scoped></style>
