<template>
  <BaseTagPaginatedPageContainer
    :scope="scope"
    :limit="limit"
    :responsePageLimit="responsePageLimit"
    :viewIndex="viewIndex"
    isWithViewChange
  >
    <template #default="slotProps">
      <BaseArtistsList
        :viewIndex="viewIndex"
        :artists="slotProps[scope]"
        :profileId="slotProps.profileId"
        isWithListenersCount
        isWithLibraryOption
        isWithFavoriteOption
        isWithBookmarkOption
        isWithListenedOption
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
  data () {
    return {
      responsePageLimit: 21,
      scope: 'artists'
    }
  }
}
</script>

<style lang="sass" scoped></style>
