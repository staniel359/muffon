<template>
  <BaseSidebarItem
    icon="recommendation"
    :text="text"
    :link-data="linkData"
  />
</template>

<script>
import BaseSidebarItem from '@/components/BaseSidebarItem.vue'
import {
  main as formatRecommendationsLinkData
} from '@/helpers/formatters/links/recommendations'

export default {
  name: 'RecommendationsItem',
  components: {
    BaseSidebarItem
  },
  computed: {
    text () {
      return this.$t(
        'navigation.recommendations'
      )
    },
    linkData () {
      return formatRecommendationsLinkData()
    }
  }
}
</script>

<style lang="sass" scoped></style>
