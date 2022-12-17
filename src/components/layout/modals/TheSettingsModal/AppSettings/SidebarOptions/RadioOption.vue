<template>
  <div class="option">
    <BaseIcon
      icon="radio"
    />

    <BaseHeader
      class="option-header"
      tag="h4"
      :text="radioText"
    />

    <BaseToggle
      store-key="sidebar.isWithRadioItem"
      :is-checked="isSidebarWithRadioItem"
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
  name: 'RadioOption',
  components: {
    BaseIcon,
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      sidebarStore,
      {
        isSidebarWithRadioItem:
          'isWithRadioItem'
      }
    ),
    radioText () {
      return this.$t(
        'navigation.radio'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
