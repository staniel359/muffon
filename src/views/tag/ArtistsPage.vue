<template>
  <BaseTagPaginatedPageContainer
    scope="artists"
    :clientPageLimit="limit"
    :responsePageLimit="21"
    :viewIndex="viewIndex"
    isWithViewChange
    @viewButtonClick="handleViewButtonClick"
  >
    <template #default="slotProps">
      <BaseArtistsList
        :viewIndex="viewIndex"
        :artists="slotProps.artists"
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

export default {
  name: 'ArtistsPage',
  components: {
    BaseTagPaginatedPageContainer,
    BaseArtistsList
  },
  data () {
    return {
      viewIndex: 1,
      viewLimits: [50, 20, 10]
    }
  },
  computed: {
    limit () {
      return this.viewLimits[
        this.viewIndex
      ]
    }
  },
  methods: {
    handleViewButtonClick (index) {
      this.viewIndex = index
    }
  }
}
</script>

<style lang="sass" scoped></style>
