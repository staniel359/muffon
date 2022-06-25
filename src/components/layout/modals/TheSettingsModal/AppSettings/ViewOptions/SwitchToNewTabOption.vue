<template>
  <div class="option">
    <BaseHeader
      class="option-header"
      tag="h4"
      :text="newTabSwitchText"
    />

    <BaseToggle
      :is-checked="isSwitchToNewTab"
      @on="handleToggleOn"
      @off="handleToggleOff"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseToggle from '*/components/BaseToggle.vue'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'

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
        'settings.options.app.view.newTabSwitch'
      )
    }
  },
  methods: {
    handleToggleOn () {
      updateGlobalStore(
        {
          'layout.isSwitchToNewTab': true
        }
      )
    },
    handleToggleOff () {
      updateGlobalStore(
        {
          'layout.isSwitchToNewTab': false
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
