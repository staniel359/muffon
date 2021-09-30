<template>
  <BaseTopPaginatedPageContainer
    scope="artists"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
    :viewIndex="viewIndex"
    isWithViewChange
    @viewButtonClick="handleViewButtonClick"
  >
    <template #default="slotProps">
      <BaseArtistsList
        :viewIndex="viewIndex"
        :artists="slotProps.artists"
        isWithListenersCount
        isWithLibraryOption
        isWithFavoriteOption
        isWithBookmarkOption
        isWithListenedOption
      />
    </template>
  </BaseTopPaginatedPageContainer>
</template>

<script>
import BaseTopPaginatedPageContainer
  from '@/containers/pages/top/BaseTopPaginatedPageContainer.vue'
import BaseArtistsList from '@/lists/artists/BaseArtistsList.vue'

export default {
  name: 'ArtistsPage',
  components: {
    BaseTopPaginatedPageContainer,
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
