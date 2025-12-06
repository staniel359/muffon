<template>
  <BaseSidebarItem
    icon="top"
    :text="text"
    :link-data="linkData"
  />
</template>

<script>
import BaseSidebarItem from '@/components/BaseSidebarItem.vue'
import {
  main as formatTopLinkData
} from '@/helpers/formatters/links/top'

export default {
  name: 'TopItem',
  components: {
    BaseSidebarItem
  },
  computed: {
    text () {
      return this.$t(
        'navigation.top'
      )
    },
    linkData () {
      return formatTopLinkData()
    }
  }
}
</script>

<style lang="sass" scoped></style>
