<template>
  <BaseSegmentContainer
    ref="segment"
    class="overflow-y-auto flex-full scroll-smooth"
  >
    <BaseTracksSimpleList
      :key="key"
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
      scrollable: null,
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
  watch: {
    queueTracksComputed: {
      immediate: true,
      handler:
        'handleQueueTracksComputedChange'
    }
  },
  mounted () {
    this.scrollable =
      this.$refs.segment.$el
  },
  methods: {
    async handleQueueTracksComputedChange (
      value,
      oldValue
    ) {
      await this.$nextTick()

      const isChanged =
        isObjectChanged(
          value,
          oldValue
        )

      if (isChanged) {
        this.key = generateKey()
        this.queueTracksCollection = value

        this.scrollToTop()
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
    },
    scrollToTop () {
      this.$refs
        .segment
        .scrollToTop()
    }
  }
}
</script>

<style lang="sass" scoped></style>
