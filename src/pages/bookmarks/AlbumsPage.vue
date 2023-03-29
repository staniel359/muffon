<template>
  <BaseBookmarksPaginatedPageContainer
    model="bookmarkAlbum"
    :scope="scope"
    :limit="limit"
    :order="order"
    :view-id="viewId"
    is-with-top-segment
    is-with-order-change
    is-with-view-change
  >
    <template
      #default="slotProps"
    >
      <BaseAlbumsList
        :albums="slotProps[scope]"
        :view-id="viewId"
        is-with-artist-name
        is-with-source
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
import BaseAlbumsList from '@/components/lists/albums/BaseAlbumsList.vue'
import orderChangeMixin from '@/mixins/orderChangeMixin'
import viewChangeMixin from '@/mixins/viewChangeMixin'

export default {
  name: 'AlbumsPage',
  components: {
    BaseBookmarksPaginatedPageContainer,
    BaseAlbumsList
  },
  mixins: [
    orderChangeMixin,
    viewChangeMixin
  ],
  data () {
    return {
      viewId: 'simple',
      scope: 'albums',
      order: 'createdDesc'
    }
  }
}
</script>

<style lang="sass" scoped></style>
