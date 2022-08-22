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
      :is-checked="isWithRecommendationsItem"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseIcon from '*/components/BaseIcon.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseToggle from '*/components/BaseToggle.vue'

export default {
  name: 'RecommendationsOption',
  components: {
    BaseIcon,
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      'sidebar',
      [
        'isWithRecommendationsItem'
      ]
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
