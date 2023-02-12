<template>
  <div class="option">
    <BaseIcon
      icon="history"
    />

    <BaseHeader
      class="option-header"
      tag="h4"
      :text="historyText"
    />

    <BaseToggle
      store-key="sidebar.isWithHistoryItem"
      :is-checked="isSidebarWithHistoryItem"
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
  name: 'HistoryOption',
  components: {
    BaseIcon,
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      sidebarStore,
      {
        isSidebarWithHistoryItem:
          'isWithHistoryItem'
      }
    ),
    historyText () {
      return this.$t(
        'navigation.history'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
