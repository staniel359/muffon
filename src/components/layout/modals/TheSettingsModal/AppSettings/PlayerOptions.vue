<template>
  <div class="main-settings-options-block">
    <BaseDivider
      :text="headerFormatted"
      isHorizontal
    />

    <SourceOption />
  </div>
</template>

<script>
import BaseDivider from '@/BaseDivider.vue'
import SourceOption from './PlayerOptions/SourceOption.vue'

export default {
  name: 'PlayerOptions',
  components: {
    BaseDivider,
    SourceOption
  },
  computed: {
    headerFormatted () {
      return this.$t(
        'layout.settings.sections.app.player'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
