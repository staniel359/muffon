<template>
  <BaseSidebarItem
    icon="history"
    :text="historyText"
    :link="historyLink"
  />
</template>

<script>
import BaseSidebarItem from '@/components/BaseSidebarItem.vue'
import {
  main as formatHistoryMainLink
} from '@/helpers/formatters/links/history'

export default {
  name: 'HistoryItem',
  components: {
    BaseSidebarItem
  },
  computed: {
    historyText () {
      return this.$t(
        'navigation.history'
      )
    },
    historyLink () {
      return formatHistoryMainLink()
    }
  }
}
</script>

<style lang="sass" scoped></style>
