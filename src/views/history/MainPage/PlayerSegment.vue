<template>
  <BaseHistoryPaginatedSegmentContainer
    :scope="scope"
    :list-scope="listScope"
    :limit="limit"
    :header-link="headerLink"
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
        is-with-queue-option
        is-with-playlist-option
        is-with-share-option
        is-with-created
      />
    </template>
  </BaseHistoryPaginatedSegmentContainer>
</template>

<script>
import BaseHistoryPaginatedSegmentContainer
  from '@/components/containers/segments/history/BaseHistoryPaginatedSegmentContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import {
  player as formatHistoryPlayerLink
} from '@/helpers/formatters/links/history'

export default {
  name: 'PlayerSegment',
  components: {
    BaseHistoryPaginatedSegmentContainer,
    BaseTracksSimpleList
  },
  data () {
    return {
      limit: 10,
      scope: 'player',
      listScope: 'tracks'
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
