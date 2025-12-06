<template>
  <BaseSidebarItem
    icon="multitag"
    :text="text"
    :link-data="linkData"
  />
</template>

<script>
import BaseSidebarItem from '@/components/BaseSidebarItem.vue'
import {
  multitag as formatMultitagLinkData
} from '@/helpers/formatters/links'

export default {
  name: 'MultitagItem',
  components: {
    BaseSidebarItem
  },
  computed: {
    text () {
      return this.$t(
        'navigation.multitag'
      )
    },
    linkData () {
      return formatMultitagLinkData()
    }
  }
}
</script>

<style lang="sass" scoped></style>
