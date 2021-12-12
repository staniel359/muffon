<template>
  <div class="main-settings-options-block">
    <BaseDivider
      :text="viewText"
      isHorizontal
    />

    <DarkModeOption />
  </div>
</template>

<script>
import BaseDivider from '@/BaseDivider.vue'
import DarkModeOption from './ViewOptions/DarkModeOption.vue'

export default {
  name: 'ViewOptions',
  components: {
    BaseDivider,
    DarkModeOption
  },
  computed: {
    viewText () {
      return this.$t(
        'layout.settings.sections.app.view'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
