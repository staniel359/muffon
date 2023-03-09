<template>
  <BaseBookmarksPaginatedPageContainer
    model="bookmarkArtist"
    :scope="scope"
    :limit="limit"
    :order="order"
    is-with-top-segment
    is-with-order-change
  >
    <template
      #default="slotProps"
    >
      <BaseArtistsSimpleList
        :artists="slotProps[scope]"
        is-with-created
        is-bookmark
        is-with-library-option
        is-with-favorite-option
        is-with-listened-option
        is-with-share-option
        is-with-delete-option
      />
    </template>
  </BaseBookmarksPaginatedPageContainer>
</template>

<script>
import BaseBookmarksPaginatedPageContainer
  from '@/components/containers/pages/bookmarks/BaseBookmarksPaginatedPageContainer.vue'
import BaseArtistsSimpleList
  from '@/components/lists/artists/BaseArtistsSimpleList.vue'
import orderChangeMixin from '@/mixins/orderChangeMixin'
import {
  artists as artistsLimits
} from '@/helpers/data/limits'

export default {
  name: 'ArtistsPage',
  components: {
    BaseBookmarksPaginatedPageContainer,
    BaseArtistsSimpleList
  },
  mixins: [
    orderChangeMixin
  ],
  data () {
    return {
      limit:
        artistsLimits.simple.large,
      scope: 'artists',
      order: 'createdDesc'
    }
  }
}
</script>

<style lang="sass" scoped></style>
