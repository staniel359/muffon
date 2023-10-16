<template>
  <div class="middle-aligned">
    <BaseTrackContainer
      ref="track"
      :track-data="playerPlaying"
      :is-clickable="false"
      :queue-tracks="null"
    >
      <template
        #default="slotProps"
      >
        <BaseIcon
          v-if="slotProps.isLoading || slotProps.isError"
          class="main-left-mini-icon"
          :is-loading="slotProps.isLoading"
          :is-error="slotProps.isError"
          is-icon-red
        />
      </template>
    </BaseTrackContainer>

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
      is-with-close-option
      is-inline
      is-show-to-top
      @source-click="handleSourceClick"
    />
  </div>
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
  methods: {
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

<style lang="sass" scoped></style>
