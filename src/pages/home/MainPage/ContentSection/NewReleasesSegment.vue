<template>
  <BaseHeaderSegmentsContainer
    :scope="headerScope"
    :header-link="headerLink"
  >
    <BaseReleasesPaginatedSegmentContainer
      :scope="scope"
      :list-scope="listScope"
      :limit="limit"
      :response-page-limit="responsePageLimit"
    >
      <template
        #default="slotProps"
      >
        <BaseAlbumsTableList
          :albums="slotProps[listScope]"
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
    </BaseReleasesPaginatedSegmentContainer>
  </BaseHeaderSegmentsContainer>
</template>

<script>
import BaseHeaderSegmentsContainer
  from '@/components/containers/segments/BaseHeaderSegmentsContainer.vue'
import BaseReleasesPaginatedSegmentContainer
  from '@/components/containers/segments/releases/BaseReleasesPaginatedSegmentContainer.vue'
import BaseAlbumsTableList
  from '@/components/lists/albums/BaseAlbumsTableList.vue'
import {
  albums as albumsLimits
} from '@/helpers/data/limits'
import {
  newReleases as formatNewReleasesLink
} from '@/helpers/formatters/links/releases'

export default {
  name: 'NewReleasesSegment',
  components: {
    BaseHeaderSegmentsContainer,
    BaseReleasesPaginatedSegmentContainer,
    BaseAlbumsTableList
  },
  data () {
    return {
      headerScope:
        'releasesCollection.new',
      scope: 'new',
      listScope: 'albums',
      limit: (
        albumsLimits.table.small / 2
      ),
      itemsInRow: (
        albumsLimits.table.small / 2
      ),
      responsePageLimit: 20
    }
  },
  computed: {
    headerLink () {
      return formatNewReleasesLink()
    }
  }
}
</script>

<style lang="sass" scoped></style>
