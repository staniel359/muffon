<template>
  <BaseSegmentContainer
    class="blurred overflow-hidden flex-full scroll-smooth"
  >
    <div>
      <BaseTracksSimpleList
        :key="key"
        :tracks="queueTracksComputed"
        :profile-id="profileId"
        :is-with-self-icons="false"
        is-with-index
        is-with-image
        is-with-artist-name
        is-with-album-title
        is-with-source
        is-with-saved-icon
        is-with-source-option
        is-with-playlist-option
        is-with-save-option
        is-with-share-option
        is-with-external-link-option
        is-with-clear-button
        is-segment
        @clear-button-click="handleClearButtonClick"
      />
    </div>

    <div
      class="placeholder"
      :class="{
        'height-player-panel': playerPlaying
      }"
    />
  </BaseSegmentContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import profileStore from '@/stores/profile'
import queueStore from '@/stores/queue'
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'
import {
  generateKey,
  isObjectChanged
} from '@/helpers/utils'

export default {
  name: 'TracksSection',
  components: {
    BaseSegmentContainer,
    BaseTracksSimpleList
  },
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
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    ),
    ...mapState(
      queueStore,
      {
        queueTracks: 'tracks',
        queueTracksShuffled: 'tracksShuffled',
        queueTracksComputed: 'tracksComputed'
      }
    )
  },
  watch: {
    queueTracksComputed:
      'handleQueueTracksComputedChange'
  },
  methods: {
    handleQueueTracksComputedChange (
      value,
      oldValue
    ) {
      const isChanged =
        isObjectChanged(
          value,
          oldValue
        )

      if (isChanged) {
        this.key = generateKey()
      }
    },
    handleClearButtonClick (
      {
        uuid
      }
    ) {
      const isMatchedTrack = (
        trackData
      ) => {
        return trackData.uuid !== uuid
      }

      const tracks = [
        ...this.queueTracks.filter(
          isMatchedTrack
        )
      ]

      const tracksShuffled = [
        ...this.queueTracksShuffled.filter(
          isMatchedTrack
        )
      ]

      updateGlobalStore(
        {
          'queue.tracks': tracks,
          'queue.tracksShuffled': tracksShuffled
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
