<template>
  <BaseTrackContainer
    :key="key"
    ref="track"
    class="options-container"
    :track-data="playerPlaying"
  >
    <template
      #default="slotProps"
    >
      <BaseIcon
        v-if="slotProps.isLoading || slotProps.isError"
        class="options-icon"
        :is-loading="slotProps.isLoading"
        :is-error="slotProps.isError"
        is-icon-red
      />

      <BaseTrackOptionsPopup
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
        is-with-source-option
        is-with-queue-option
        is-with-save-option
        is-with-share-option
        is-with-external-link-option
        is-inline
        @source-click="handleSourceClick"
      />
    </template>
  </BaseTrackContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import BaseTrackContainer
  from '@/components/containers/track/BaseTrackContainer.vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseTrackOptionsPopup
  from '@/components/popups/track/BaseTrackOptionsPopup.vue'
import selfMixin from '@/mixins/selfMixin'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'OptionsSection',
  components: {
    BaseTrackContainer,
    BaseIcon,
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
    },
    handleSourceClick (
      value
    ) {
      this.getSourceAudio(
        {
          source: value
        }
      )
    },
    getSourceAudio (
      {
        source
      }
    ) {
      this.$refs
        .track
        .getSourceAudio(
          {
            source
          }
        )
    }
  }
}
</script>

<style lang="sass" scoped>
.options-container
  @extend .d-flex, .align-items-center

.options-icon
  margin-right: 0.5em !important
</style>
