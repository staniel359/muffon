<template>
  <div class="option">
    <BaseIcon
      icon="volume up"
    />

    <BaseHeader
      class="option-header"
      tag="h4"
      :text="recommendationsText"
    />

    <BaseToggle
      store-key="sidebar.isWithRecommendationsItem"
      :is-checked="isSidebarWithRecommendationsItem"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import sidebarStore from '@/stores/sidebar'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'RecommendationsOption',
  components: {
    BaseIcon,
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      sidebarStore,
      {
        isSidebarWithRecommendationsItem:
          'isWithRecommendationsItem'
      }
    ),
    recommendationsText () {
      return this.$t(
        'navigation.recommendations'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
