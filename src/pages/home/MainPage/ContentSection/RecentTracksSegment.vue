<template>
  <BaseHeaderSegmentsContainer
    :scope="headerScope"
    :header-link="headerLink"
  >
    <BaseHistoryPaginatedSegmentContainer
      :scope="scope"
      :list-scope="listScope"
      :limit="limit"
    >
      <template
        #default="slotProps"
      >
        <BaseTracksSimpleList
          :tracks="slotProps[listScope]"
          is-with-image
          is-with-artist-name
          is-with-album-title
          is-with-duration
          is-with-source
          is-with-source-option
          is-with-library-option
          is-with-favorite-option
          is-with-bookmark-option
          is-with-listened-option
          is-with-playlist-option
          is-with-queue-option
          is-with-save-option
          is-with-share-option
          is-with-external-link-option
          is-with-created
        />
      </template>
    </BaseHistoryPaginatedSegmentContainer>
  </BaseHeaderSegmentsContainer>
</template>

<script>
import BaseHeaderSegmentsContainer
  from '@/components/containers/segments/BaseHeaderSegmentsContainer.vue'
import BaseHistoryPaginatedSegmentContainer
  from '@/components/containers/segments/history/BaseHistoryPaginatedSegmentContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import {
  tracks as tracksLimits
} from '@/helpers/data/limits'
import {
  player as formatHistoryPlayerLink
} from '@/helpers/formatters/links/history'

export default {
  name: 'RecentTracksSegment',
  components: {
    BaseHeaderSegmentsContainer,
    BaseHistoryPaginatedSegmentContainer,
    BaseTracksSimpleList
  },
  data () {
    return {
      headerScope:
        'listenedRecently',
      scope: 'player',
      listScope: 'tracks',
      limit:
        tracksLimits.simple.extrasmall
    }
  },
  computed: {
    headerLink () {
      return formatHistoryPlayerLink()
    }
  }
}
</script>

<style lang="sass" scoped></style>
