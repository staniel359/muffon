<template>
  <BaseTagPaginatedPageContainer
    :tag-name="tagName"
    :scope="scope"
    :limit="limit"
    :response-page-limit="responsePageLimit"
    :view-index="viewIndex"
    is-with-top-segment
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
  </BaseTagPaginatedPageContainer>
</template>

<script>
import BaseTagPaginatedPageContainer
  from '*/components/containers/pages/tag/BaseTagPaginatedPageContainer.vue'
import BaseArtistsList from '*/components/lists/artists/BaseArtistsList.vue'
import viewChangeMixin from '*/mixins/viewChangeMixin'

export default {
  name: 'ArtistsPage',
  components: {
    BaseTagPaginatedPageContainer,
    BaseArtistsList
  },
  mixins: [
    viewChangeMixin
  ],
  props: {
    tagName: String
  },
  data () {
    return {
      responsePageLimit: 21,
      scope: 'artists'
    }
  }
}
</script>

<style lang="sass" scoped></style>
