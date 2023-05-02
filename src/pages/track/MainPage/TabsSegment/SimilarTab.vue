<template>
  <BaseTrackTabContainer
    :scope="scope"
    :limit="limit"
    :artist-name="artistName"
    :track-title="trackTitle"
    :is-active="isActive"
    @focus="handleFocus"
  >
    <template
      #default="slotProps"
    >
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        is-with-artist-name
        is-with-artist-image
        is-with-duration
        is-with-source-option
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-playlist-option
        is-with-queue-option
        is-with-share-option
        is-with-external-link-option
      />
    </template>
  </BaseTrackTabContainer>
</template>

<script>
import BaseTrackTabContainer
  from '@/components/containers/tabs/track/BaseTrackTabContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import {
  tracks as tracksLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'SimilarTab',
  components: {
    BaseTrackTabContainer,
    BaseTracksSimpleList
  },
  mixins: [
    tabMixin
  ],
  props: {
    trackData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      limit:
        tracksLimits.simple.small,
      scope: 'similar'
    }
  },
  computed: {
    artistName () {
      return this.trackData.artist.name
    },
    trackTitle () {
      return this.trackData.title
    }
  }
}
</script>

<style lang="sass" scoped></style>
