<template>
  <BaseReleasesPaginatedPageContainer
    :scope="scope"
    :list-scope="listScope"
    :limit="limit"
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
  </BaseReleasesPaginatedPageContainer>
</template>

<script>
import BaseReleasesPaginatedPageContainer
  from '*/components/containers/pages/releases/BaseReleasesPaginatedPageContainer.vue'
import BaseAlbumsTableList
  from '*/components/lists/albums/BaseAlbumsTableList.vue'

export default {
  name: 'UpcomingPage',
  components: {
    BaseReleasesPaginatedPageContainer,
    BaseAlbumsTableList
  },
  data () {
    return {
      limit: 20,
      itemsInRow: 4,
      scope: 'upcoming',
      listScope: 'albums'
    }
  }
}
</script>

<style lang="sass" scoped></style>
