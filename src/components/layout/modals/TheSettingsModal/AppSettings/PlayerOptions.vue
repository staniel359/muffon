<template>
  <div class="main-settings-options-block">
    <BaseDivider
      :text="playerText"
      is-horizontal
    />

    <div>
      <SourceOption />

      <BitrateOption />
    </div>
  </div>
</template>

<script>
import BaseDivider from '*/components/BaseDivider.vue'
import SourceOption from './PlayerOptions/SourceOption.vue'
import BitrateOption from './PlayerOptions/BitrateOption.vue'

export default {
  name: 'PlayerOptions',
  components: {
    BaseDivider,
    SourceOption,
    BitrateOption
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
