<template>
  <BaseArtistPaginatedPageContainer
    pageNameKey="similar"
    scope="similar"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
    :viewIndex="viewIndex"
    isWithViewChange
    @viewButtonClick="handleViewButtonClick"
  >
    <template #default="slotProps">
      <BaseArtistsList
        :viewIndex="viewIndex"
        :artists="slotProps.similar"
      />
    </template>
  </BaseArtistPaginatedPageContainer>
</template>

<script>
import BaseArtistPaginatedPageContainer
  from '@/containers/pages/artist/BaseArtistPaginatedPageContainer.vue'
import BaseArtistsList from '@/lists/artists/BaseArtistsList.vue'

export default {
  name: 'SimilarPage',
  components: {
    BaseArtistPaginatedPageContainer,
    BaseArtistsList
  },
  data () {
    return {
      viewIndex: 1,
      viewLimits: [20, 20, 10]
    }
  },
  computed: {
    limit () {
      return this.viewLimits[this.viewIndex]
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
