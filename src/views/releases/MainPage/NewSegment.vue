<template>
  <BaseReleasesPaginatedSegmentContainer
    :scope="scope"
    :list-scope="listScope"
    :limit="limit"
    :response-page-limit="responsePageLimit"
    :header-link="headerLink"
  >
    <template #default="slotProps">
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
  newReleases as formatReleasesNewLink
} from '@/helpers/formatters/links/releases'

export default {
  name: 'NewSegment',
  components: {
    BaseReleasesPaginatedSegmentContainer,
    BaseAlbumsTableList
  },
  data () {
    return {
      limit: 4,
      responsePageLimit: 20,
      itemsInRow: 4,
      scope: 'new',
      listScope: 'albums'
    }
  },
  computed: {
    headerLink () {
      return formatReleasesNewLink()
    }
  }
}
</script>

<style lang="sass" scoped></style>
