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
        <BaseAlbumsTableList
          :albums="slotProps[scope]"
          :items-in-row="itemsInRow"
          is-with-artist-name
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
import BaseAlbumsTableList
  from '@/components/lists/albums/BaseAlbumsTableList.vue'
import {
  albums as albumsLimits
} from '@/helpers/data/limits'
import {
  albums as formatTopAlbumsLink
} from '@/helpers/formatters/links/top'

export default {
  name: 'TopAlbumsSegment',
  components: {
    BaseHeaderSegmentsContainer,
    BaseTopPaginatedSegmentContainer,
    BaseAlbumsTableList
  },
  data () {
    return {
      headerScope:
        'topCollection.albums',
      scope: 'albums',
      limit: (
        albumsLimits.table.small / 2
      ),
      itemsInRow: (
        albumsLimits.table.small / 2
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
      return formatTopAlbumsLink(
        {
          country: this.topCountry
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
