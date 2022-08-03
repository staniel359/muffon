<template>
  <div class="main-settings-options-block">
    <BaseDivider
      :text="playerText"
      is-horizontal
    />

    <div>
      <SourceOption />

      <BitrateOption />

      <AlbumOption />
    </div>
  </div>
</template>

<script>
import BaseDivider from '*/components/BaseDivider.vue'
import SourceOption from './PlayerOptions/SourceOption.vue'
import BitrateOption from './PlayerOptions/BitrateOption.vue'
import AlbumOption from './PlayerOptions/AlbumOption.vue'

export default {
  name: 'PlayerOptions',
  components: {
    BaseDivider,
    SourceOption,
    BitrateOption,
    AlbumOption
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
