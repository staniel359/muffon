<template>
  <BasePaginatedListContainer
    v-if="albums.length"
    :response-data="albumsData"
    :scope="scope"
    :limit="limit"
    :response-page-limit="totalCount"
    is-reset
    is-with-pagination
    @focus="handleFocus"
  >
    <template #default="slotProps">
      <BaseAlbumsSimpleList
        :albums="slotProps[scope]"
        is-with-artist-name
        is-with-delete-option
        is-clearable
        @link-click="handleLinkClick"
        @delete-option-click="handleDeleteOptionClick"
      />
    </template>
  </BasePaginatedListContainer>
</template>

<script>
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'
import BaseAlbumsSimpleList
  from '*/components/lists/albums/BaseAlbumsSimpleList.vue'

export default {
  name: 'AlbumsList',
  components: {
    BasePaginatedListContainer,
    BaseAlbumsSimpleList
  },
  inject: [
    'hideModal'
  ],
  props: {
    albums: {
      type: Array,
      default () {
        return []
      }
    }
  },
  emits: [
    'change',
    'focus'
  ],
  data () {
    return {
      limit: 20,
      scope: 'albums'
    }
  },
  computed: {
    albumsData () {
      return {
        page: 1,
        total_pages: 1,
        albums: [
          ...this.albums
        ]
      }
    },
    totalCount () {
      return this.albums.length
    }
  },
  methods: {
    handleLinkClick () {
      this.hideModal()
    },
    handleDeleteOptionClick (
      {
        uuid
      }
    ) {
      function isMatchedAlbum (
        albumData
      ) {
        return albumData.uuid !== uuid
      }

      const albums =
        this.albums.filter(
          isMatchedAlbum
        )

      this.$emit(
        'change',
        albums
      )
    },
    handleFocus () {
      this.$emit(
        'focus'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
