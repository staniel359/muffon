<template>
  <BaseSegmentContainer
    class="blurred queue-tracks-container"
    :class="{
      'player-panel-padded': playerPlaying
    }"
  >
    <BaseTracksSimpleList
      :key="key"
      class="queue-tracks"
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
      is-with-delete-option
      is-clearable
      @delete-option-click="handleDeleteOptionClick"
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
    handleDeleteOptionClick (
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

<style lang="sass" scoped>
.queue-tracks-container
  @extend .overflow-hidden, .flex-full
  padding: 1em
  transition: padding 0.5s
  &.player-panel-padded
    padding-bottom: calc(#{$playerPanelHeight} + 1em)
.queue-tracks
  @extend .h-100, .overflow-y-auto
</style>
