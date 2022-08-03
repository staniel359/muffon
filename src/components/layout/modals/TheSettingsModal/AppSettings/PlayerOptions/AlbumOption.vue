<template>
  <div class="option">
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
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseToggle from '*/components/BaseToggle.vue'

export default {
  name: 'AlbumOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      'player',
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
