<template>
  <BaseTracksSimpleList
    :tracks="queueTracksCollection"
    :profile-id="profileId"
    :scrollable="scrollable"
    is-with-index
    is-with-image
    is-with-artist-name
    is-with-album-title
    is-with-source
    is-with-saved-icon
    is-with-source-option
    is-with-library-option
    is-with-playlist-option
    is-with-favorite-option
    is-with-bookmark-option
    is-with-listened-option
    is-with-save-option
    is-with-share-option
    is-with-external-link-option
    is-with-delete-option
    is-clearable
    is-segment
    is-lazy
    @delete-option-click="handleDeleteOptionClick"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import queueStore from '@/stores/queue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'TracksList',
  components: {
    BaseTracksSimpleList
  },
  props: {
    scrollable: HTMLDivElement
  },
  data () {
    return {
      queueTracksCollection: []
    }
  },
  computed: {
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
  beforeMount () {
    this.queueTracksCollection =
      this.queueTracksComputed
  },
  methods: {
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

<style lang="sass" scoped></style>
