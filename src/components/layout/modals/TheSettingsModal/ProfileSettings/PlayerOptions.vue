<template>
  <div class="main-settings-options-block">
    <BaseDivider
      :text="playerText"
      is-horizontal
    />

    <div>
      <PlayingOption />
    </div>
  </div>
</template>

<script>
import BaseDivider from '*/components/BaseDivider.vue'
import PlayingOption from './PlayerOptions/PlayingOption.vue'

export default {
  name: 'PlayerOptions',
  components: {
    BaseDivider,
    PlayingOption
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
