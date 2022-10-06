<template>
  <div class="option">
    <BaseHeader
      class="option-header"
      tag="h4"
      :text="newTabSwitchText"
    />

    <BaseToggle
      store-key="layout.isSwitchToNewTab"
      :is-checked="isSwitchToNewTab"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'SwitchToNewTabOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      'layout',
      [
        'isSwitchToNewTab'
      ]
    ),
    newTabSwitchText () {
      return this.$t(
        'settings.options.app.tabs.newTabSwitch'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
