<template>
  <BaseReleasesPaginatedSegmentContainer
    :scope="scope"
    :list-scope="listScope"
    :limit="limit"
    :response-page-limit="responsePageLimit"
    :header-link="headerLink"
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
      />
    </template>
  </BaseReleasesPaginatedSegmentContainer>
</template>

<script>
import BaseReleasesPaginatedSegmentContainer
  from '@/components/containers/segments/releases/BaseReleasesPaginatedSegmentContainer.vue'
import BaseAlbumsTableList
  from '@/components/lists/albums/BaseAlbumsTableList.vue'
import {
  upcoming as formatReleasesUpcomingLink
} from '@/helpers/formatters/links/releases'

export default {
  name: 'UpcomingSegment',
  components: {
    BaseReleasesPaginatedSegmentContainer,
    BaseAlbumsTableList
  },
  data () {
    return {
      limit: 4,
      responsePageLimit: 20,
      itemsInRow: 4,
      scope: 'upcoming',
      listScope: 'albums'
    }
  },
  computed: {
    headerLink () {
      return formatReleasesUpcomingLink()
    }
  }
}
</script>

<style lang="sass" scoped></style>
