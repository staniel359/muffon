<template>
  <BaseTrackOptionsPopup
    :key="key"
    :track-data="playerPlaying"
    :library-id="libraryId"
    :favorite-id="favoriteId"
    :bookmark-id="bookmarkId"
    :listened-id="listenedId"
    is-with-library-option
    is-with-favorite-option
    is-with-bookmark-option
    is-with-listened-option
    is-with-playlist-option
    is-with-queue-option
    is-with-save-option
    is-with-share-option
    is-with-external-link-option
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import BaseTrackOptionsPopup
  from '@/components/popups/track/BaseTrackOptionsPopup.vue'
import selfMixin from '@/mixins/selfMixin'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'OptionsSection',
  components: {
    BaseTrackOptionsPopup
  },
  mixins: [
    selfMixin
  ],
  data () {
    return {
      key: null
    }
  },
  computed: {
    ...mapState(
      playerStore,
      {
        playerPlaying: 'playing'
      }
    ),
    modelData () {
      return this.playerPlaying
    }
  },
  watch: {
    playerPlaying:
      'handlePlayerPlayingChange'
  },
  methods: {
    handlePlayerPlayingChange () {
      this.key = generateKey()
    }
  }
}
</script>

<style lang="sass" scoped></style>
