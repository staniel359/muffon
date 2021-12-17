<template>
  <BaseSidebarItem
    icon="volume up"
    :text="recommendationsText"
    :link="recommendationsLink"
  />
</template>

<script>
import BaseSidebarItem from '@/BaseSidebarItem.vue'
import {
  recommendations as formatRecommendationsLink
} from '#/formatters/links'

export default {
  name: 'RecommendationsItem',
  components: {
    BaseSidebarItem
  },
  computed: {
    recommendationsText () {
      return this.$t(
        'layout.navigation.recommendations'
      )
    },
    recommendationsLink () {
      return formatRecommendationsLink()
    }
  }
}
</script>

<style lang="sass" scoped></style>
