<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="albumText"
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
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'AlbumOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      playerStore,
      {
        isPlayerWithAlbum: 'isWithAlbum'
      }
    ),
    albumText () {
      return this.$t(
        'settings.options.app.player.album'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
