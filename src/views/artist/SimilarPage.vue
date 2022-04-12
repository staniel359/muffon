<template>
  <BaseArtistPaginatedPageContainer
    :artistName="artistName"
    :limit="limit"
    :scope="scope"
    :viewIndex="viewIndex"
    isWithViewChange
  >
    <template #default="slotProps">
      <BaseArtistsList
        :artists="slotProps[scope]"
        :profileId="slotProps.profileId"
        :viewIndex="viewIndex"
        isWithListenersCount
        isWithLibraryOption
        isWithFavoriteOption
        isWithBookmarkOption
        isWithListenedOption
      />
    </template>
  </BaseArtistPaginatedPageContainer>
</template>

<script>
import BaseArtistPaginatedPageContainer
  from '*/components/containers/pages/artist/BaseArtistPaginatedPageContainer.vue'
import BaseArtistsList from '*/components/lists/artists/BaseArtistsList.vue'
import viewChangeMixin from '*/mixins/viewChangeMixin'

export default {
  name: 'SimilarPage',
  components: {
    BaseArtistPaginatedPageContainer,
    BaseArtistsList
  },
  mixins: [
    viewChangeMixin
  ],
  data () {
    return {
      scope: 'similar'
    }
  },
  props: {
    artistName: String
  }
}
</script>

<style lang="sass" scoped></style>
