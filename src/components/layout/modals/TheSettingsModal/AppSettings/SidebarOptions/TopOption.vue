<template>
  <div class="main-settings-option">
    <BaseIcon
      icon="top"
    />

    <BaseHeader
      class="option-header"
      tag="h4"
      :text="topText"
    />

    <BaseToggle
      store-key="sidebar.isWithTopItem"
      :is-checked="isSidebarWithTopItem"
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
  name: 'TopOption',
  components: {
    BaseIcon,
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      sidebarStore,
      {
        isSidebarWithTopItem:
          'isWithTopItem'
      }
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
