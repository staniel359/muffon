<template>
  <BaseHeaderSegmentsContainer
    :scope="headerScope"
    :header-link="headerLink"
  >
    <BaseTopPaginatedSegmentContainer
      :scope="scope"
      :limit="limit"
      is-with-top-section
      is-with-play-button
    >
      <template
        #topPlayButton
      >
        <BaseTopTracksPlayButton
          limit-name="default"
        />
      </template>

      <template
        #default="slotProps"
      >
        <BaseTracksSimpleList
          :tracks="slotProps[scope]"
          is-with-artist-image
          is-with-artist-name
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
    </BaseTopPaginatedSegmentContainer>
  </BaseHeaderSegmentsContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import topStore from '@/stores/top'
import BaseHeaderSegmentsContainer
  from '@/components/containers/segments/BaseHeaderSegmentsContainer.vue'
import BaseTopPaginatedSegmentContainer
  from '@/components/containers/segments/top/BaseTopPaginatedSegmentContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import BaseTopTracksPlayButton
  from '@/components/buttons/play/top/BaseTopTracksPlayButton.vue'
import {
  tracks as tracksLimits
} from '@/helpers/data/limits'
import {
  tracks as formatTopTracksLink
} from '@/helpers/formatters/links/top'

export default {
  name: 'TopTracksSegment',
  components: {
    BaseHeaderSegmentsContainer,
    BaseTopPaginatedSegmentContainer,
    BaseTracksSimpleList,
    BaseTopTracksPlayButton
  },
  data () {
    return {
      headerScope:
        'topCollection.tracks',
      scope: 'tracks',
      limit:
        tracksLimits.simple.extrasmall
    }
  },
  computed: {
    ...mapState(
      topStore,
      {
        topCountry: 'country'
      }
    ),
    headerLink () {
      return formatTopTracksLink(
        {
          country: this.topCountry
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
