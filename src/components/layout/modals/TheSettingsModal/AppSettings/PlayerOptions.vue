<template>
  <div class="main-settings-options-block">
    <BaseDivider
      :text="playerText"
      isHorizontal
    />

    <SourceOption />
  </div>
</template>

<script>
import BaseDivider from '*/components/BaseDivider.vue'
import SourceOption from './PlayerOptions/SourceOption.vue'

export default {
  name: 'PlayerOptions',
  components: {
    BaseDivider,
    SourceOption
  },
  computed: {
    playerText () {
      return this.$t(
        'settings.sections.app.player'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
