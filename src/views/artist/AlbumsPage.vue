<template>
  <BaseArtistPaginatedPageContainer
    ref="page"
    :artist-name="artistName"
    :scope="scope"
    :limit="limit"
    is-with-top-segment
  >
    <template #top="topSlotProps">
      <BaseArtistSourceSelect
        :artist-name="topSlotProps.artistName"
        @change="handleArtistChange"
      />
    </template>

    <template #default="slotProps">
      <BaseAlbumsTableList
        :albums="slotProps[scope]"
        :artist-name="slotProps.artistName"
        :items-in-row="itemsInRow"
        is-with-listeners-count
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-multiple-artist-names
      />
    </template>
  </BaseArtistPaginatedPageContainer>
</template>

<script>
import BaseArtistPaginatedPageContainer
  from '*/components/containers/pages/artist/BaseArtistPaginatedPageContainer.vue'
import BaseArtistSourceSelect
  from '*/components/models/artist/BaseArtistSourceSelect.vue'
import BaseAlbumsTableList
  from '*/components/lists/albums/BaseAlbumsTableList.vue'

export default {
  name: 'AlbumsPage',
  components: {
    BaseArtistPaginatedPageContainer,
    BaseArtistSourceSelect,
    BaseAlbumsTableList
  },
  props: {
    artistName: String
  },
  data () {
    return {
      limit: 20,
      itemsInRow: 4,
      scope: 'albums'
    }
  },
  methods: {
    handleArtistChange () {
      this.reset()
    },
    reset () {
      this.$refs
        .page
        .reset()
    }
  }
}
</script>

<style lang="sass" scoped></style>
