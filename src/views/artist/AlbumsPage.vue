<template>
  <BaseArtistPaginatedPageContainer
    ref="page"
    :artist-name="artistName"
    :scope="scope"
    :limit="limit"
    :view-index="viewIndex"
    is-with-top-segment
    is-with-view-change
  >
    <template #top="topSlotProps">
      <BaseArtistSourceSelect
        :artist-name="topSlotProps.artistName"
      />
    </template>

    <template #default="slotProps">
      <BaseAlbumsList
        :albums="slotProps[scope]"
        :artist-name="slotProps.artistName"
        :view-index="viewIndex"
        is-with-listeners-count
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
        is-with-multiple-artist-names
      />
    </template>
  </BaseArtistPaginatedPageContainer>
</template>

<script>
import BaseArtistPaginatedPageContainer
  from '@/components/containers/pages/artist/BaseArtistPaginatedPageContainer.vue'
import BaseArtistSourceSelect
  from '@/components/models/artist/BaseArtistSourceSelect.vue'
import BaseAlbumsList from '@/components/lists/albums/BaseAlbumsList.vue'
import viewChangeMixin from '@/mixins/viewChangeMixin'

export default {
  name: 'AlbumsPage',
  components: {
    BaseArtistPaginatedPageContainer,
    BaseArtistSourceSelect,
    BaseAlbumsList
  },
  mixins: [
    viewChangeMixin
  ],
  props: {
    artistName: String
  },
  data () {
    return {
      scope: 'albums'
    }
  }
}
</script>

<style lang="sass" scoped></style>
