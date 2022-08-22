<template>
  <div class="option">
    <BaseIcon
      icon="arrow alternate circle up"
    />

    <BaseHeader
      class="option-header"
      tag="h4"
      :text="topText"
    />

    <BaseToggle
      store-key="sidebar.isWithTopItem"
      :is-checked="isWithTopItem"
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
  name: 'TopOption',
  components: {
    BaseIcon,
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      'sidebar',
      [
        'isWithTopItem'
      ]
    ),
    topText () {
      return this.$t(
        'navigation.top'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
