<template>
  <div class="main-settings-options-block">
    <BaseDivider
      :text="otherText"
      is-horizontal
    />

    <div>
      <ExitOption />

      <CloseTabsOption />
    </div>
  </div>
</template>

<script>
import BaseDivider from '*/components/BaseDivider.vue'
import ExitOption from './OtherOptions/ExitOption.vue'
import CloseTabsOption from './OtherOptions/CloseTabsOption.vue'

export default {
  name: 'OtherOptions',
  components: {
    BaseDivider,
    ExitOption,
    CloseTabsOption
  },
  computed: {
    otherText () {
      return this.$t(
        'settings.sections.app.other'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
