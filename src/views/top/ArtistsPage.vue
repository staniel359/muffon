<template>
  <BaseTopPaginatedPageContainer
    :scope="scope"
    :limit="limit"
    :view-index="viewIndex"
    is-with-view-change
  >
    <template #default="slotProps">
      <BaseArtistsList
        :view-index="viewIndex"
        :artists="slotProps[scope]"
        is-with-listeners-count
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
      />
    </template>
  </BaseTopPaginatedPageContainer>
</template>

<script>
import BaseTopPaginatedPageContainer
  from '*/components/containers/pages/top/BaseTopPaginatedPageContainer.vue'
import BaseArtistsList from '*/components/lists/artists/BaseArtistsList.vue'
import viewChangeMixin from '*/mixins/viewChangeMixin'

export default {
  name: 'ArtistsPage',
  components: {
    BaseTopPaginatedPageContainer,
    BaseArtistsList
  },
  mixins: [
    viewChangeMixin
  ],
  data () {
    return {
      scope: 'artists'
    }
  }
}
</script>

<style lang="sass" scoped></style>
