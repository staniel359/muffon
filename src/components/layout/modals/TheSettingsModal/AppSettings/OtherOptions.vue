<template>
  <div class="main-settings-options-block">
    <BaseDivider
      :text="otherText"
      is-horizontal
    />

    <div>
      <ExitOption />
    </div>
  </div>
</template>

<script>
import BaseDivider from '*/components/BaseDivider.vue'
import ExitOption from './OtherOptions/ExitOption.vue'

export default {
  name: 'OtherOptions',
  components: {
    BaseDivider,
    ExitOption
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
