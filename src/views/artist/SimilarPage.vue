<template>
  <BaseArtistPaginatedPageContainer
    :artist-name="artistName"
    :limit="limit"
    :scope="scope"
    :view-index="viewIndex"
    is-with-top-segment
    is-with-view-change
  >
    <template #default="slotProps">
      <BaseArtistsList
        :artists="slotProps[scope]"
        :view-index="viewIndex"
        is-with-listeners-count
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
      />
    </template>
  </BaseArtistPaginatedPageContainer>
</template>

<script>
import BaseArtistPaginatedPageContainer
  from '@/components/containers/pages/artist/BaseArtistPaginatedPageContainer.vue'
import BaseArtistsList from '@/components/lists/artists/BaseArtistsList.vue'
import viewChangeMixin from '@/mixins/viewChangeMixin'

export default {
  name: 'SimilarPage',
  components: {
    BaseArtistPaginatedPageContainer,
    BaseArtistsList
  },
  mixins: [
    viewChangeMixin
  ],
  props: {
    artistName: String
  },
  data () {
    return {
      scope: 'similar'
    }
  }
}
</script>

<style lang="sass" scoped></style>
