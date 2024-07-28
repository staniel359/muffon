<template>
  <BasePaginatedListContainer
    :response-data="albumsData"
    :scope="scope"
    :limit="limit"
    :response-page-limit="albumsCount"
    is-reset
    @focus="handleFocus"
  >
    <template
      #default="slotProps"
    >
      <BaseAlbumsSimpleList
        :albums="slotProps[scope]"
        is-with-artist-name
        is-with-clear-button
        @link-click="handleLinkClick"
        @clear-button-click="handleClearButtonClick"
      />
    </template>
  </BasePaginatedListContainer>
</template>

<script>
import BasePaginatedListContainer
  from '@/components/containers/lists/paginated/BasePaginatedListContainer.vue'
import BaseAlbumsSimpleList
  from '@/components/lists/albums/BaseAlbumsSimpleList.vue'
import {
  albums as albumsLimits
} from '@/helpers/data/limits'

export default {
  name: 'AlbumsList',
  components: {
    BasePaginatedListContainer,
    BaseAlbumsSimpleList
  },
  inject: [
    'deleteCollectionItem',
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
    'focus'
  ],
  data () {
    return {
      limit:
        albumsLimits.simple.large,
      scope: 'albums'
    }
  },
  computed: {
    albumsData () {
      return {
        page: 1,
        total_pages: 1,
        albums: this.albums
      }
    },
    albumsCount () {
      return this.albums.length
    }
  },
  methods: {
    handleLinkClick () {
      this.hideModal()
    },
    handleClearButtonClick (
      {
        uuid
      }
    ) {
      this.deleteCollectionItem(
        {
          collection: 'collection',
          uuid
        }
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
