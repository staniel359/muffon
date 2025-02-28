<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
      />

      <BaseToggle
        store-key="player.isWithAlbum"
        :is-checked="isPlayerWithAlbum"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import BaseSettingsOptionHeader
  from '@/components/headers/settings/BaseSettingsOptionHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'AlbumOption',
  components: {
    BaseSettingsOptionHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      playerStore,
      {
        isPlayerWithAlbum: 'isWithAlbum'
      }
    ),
    optionText () {
      return this.$t(
        'settings.options.app.player.album'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
