<template>
  <div class="main-settings-options-block">
    <BaseDivider
      :text="windowText"
      is-horizontal
    />

    <div>
      <MaximizeOption />

      <ExitOption />
    </div>
  </div>
</template>

<script>
import BaseDivider from '*/components/BaseDivider.vue'
import MaximizeOption from './WindowOptions/MaximizeOption.vue'
import ExitOption from './WindowOptions/ExitOption.vue'

export default {
  name: 'WindowOptions',
  components: {
    BaseDivider,
    MaximizeOption,
    ExitOption
  },
  computed: {
    windowText () {
      return this.$t(
        'settings.sections.app.window'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
