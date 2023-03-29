<template>
  <BaseTagPaginatedPageContainer
    :tag-name="tagName"
    :scope="scope"
    :limit="limit"
    :view-id="viewId"
    is-with-top-segment
    is-with-view-change
  >
    <template
      #default="slotProps"
    >
      <BaseAlbumsList
        :albums="slotProps[scope]"
        :view-id="viewId"
        is-with-artist-name
        is-with-listeners-count
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
      />
    </template>
  </BaseTagPaginatedPageContainer>
</template>

<script>
import BaseTagPaginatedPageContainer
  from '@/components/containers/pages/tag/BaseTagPaginatedPageContainer.vue'
import BaseAlbumsList from '@/components/lists/albums/BaseAlbumsList.vue'
import viewChangeMixin from '@/mixins/viewChangeMixin'

export default {
  name: 'AlbumsPage',
  components: {
    BaseTagPaginatedPageContainer,
    BaseAlbumsList
  },
  mixins: [
    viewChangeMixin
  ],
  props: {
    tagName: String
  },
  data () {
    return {
      scope: 'albums'
    }
  }
}
</script>

<style lang="sass" scoped></style>
