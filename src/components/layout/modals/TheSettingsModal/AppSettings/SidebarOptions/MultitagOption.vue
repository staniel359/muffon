<template>
  <div class="option">
    <BaseIcon
      icon="tags"
    />

    <BaseHeader
      class="option-header"
      tag="h4"
      :text="multitagText"
    />

    <BaseToggle
      store-key="sidebar.isWithMultitagItem"
      :is-checked="isSidebarWithMultitagItem"
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
  name: 'MultitagOption',
  components: {
    BaseIcon,
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      sidebarStore,
      {
        isSidebarWithMultitagItem:
          'isWithMultitagItem'
      }
    ),
    multitagText () {
      return this.$t(
        'navigation.multitag'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
