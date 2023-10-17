<template>
  <BaseSegmentContainer
    ref="segment"
    class="blurred overflow-y-auto flex-full scroll-smooth"
  >
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
      is-with-delete-option
      is-clearable
      is-segment
      @delete-option-click="handleDeleteOptionClick"
    />
  </BaseSegmentContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
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
import scrollMixin from '@/mixins/scrollMixin'

export default {
  name: 'TracksSegment',
  components: {
    BaseSegmentContainer,
    BaseTracksSimpleList
  },
  mixins: [
    scrollMixin
  ],
  data () {
    return {
      key: null,
      scrollable: null
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
  watch: {
    queueTracksComputed:
      'handleQueueTracksComputedChange'
  },
  mounted () {
    this.scrollable =
      this.$refs.segment.$el
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

<style lang="sass" scoped></style>
