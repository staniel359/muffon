<template>
  <div class="option">
    <BaseHeader
      class="option-header"
      tag="h4"
      :text="closeTabsText"
    />

    <BaseToggle
      store-key="layout.isCloseTabsOnExit"
      :is-checked="isCloseTabsOnExit"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseToggle from '*/components/BaseToggle.vue'

export default {
  name: 'CloseTabsOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      'layout',
      [
        'isCloseTabsOnExit'
      ]
    ),
    closeTabsText () {
      return this.$t(
        'settings.options.app.other.closeTabs'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
