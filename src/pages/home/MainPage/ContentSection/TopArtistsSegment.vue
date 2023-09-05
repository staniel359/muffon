<template>
  <BaseHeaderSegmentsContainer
    :scope="headerScope"
    :header-link="headerLink"
  >
    <BaseTopPaginatedSegmentContainer
      :scope="scope"
      :limit="limit"
    >
      <template
        #default="slotProps"
      >
        <BaseArtistsTableList
          :artists="slotProps[scope]"
          :items-in-row="itemsInRow"
          is-with-listeners-count
          is-with-library-option
          is-with-favorite-option
          is-with-bookmark-option
          is-with-listened-option
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
import BaseArtistsTableList
  from '@/components/lists/artists/BaseArtistsTableList.vue'
import {
  artists as artistsLimits
} from '@/helpers/data/limits'
import {
  artists as formatTopArtistsLink
} from '@/helpers/formatters/links/top'

export default {
  name: 'TopArtistsSegment',
  components: {
    BaseHeaderSegmentsContainer,
    BaseTopPaginatedSegmentContainer,
    BaseArtistsTableList
  },
  data () {
    return {
      headerScope:
        'topCollection.artists',
      scope: 'artists',
      limit: (
        artistsLimits.table.small / 2
      ),
      itemsInRow: (
        artistsLimits.table.small / 2
      )
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
      return formatTopArtistsLink(
        {
          country: this.topCountry
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
