<template>
  <BasePaginatedContainer
    v-if="albums.length"
    ref="pagination"
    scope="albums"
    :responseData="albumsDataFormatted"
    :clientPageLimit="20"
    :responsePageLimit="totalCount"
    isReset
    isWithPagination
    @focus="handleFocus"
  >
    <template #default="slotProps">
      <BaseAlbumsSimpleList
        :albums="slotProps.albums"
        isWithArtistName
        isWithDeleteOption
        isClearable
        @linkClick="handleLinkClick"
        @deleteButtonClick="handleDeleteButtonClick"
      />
    </template>
  </BasePaginatedContainer>
</template>

<script>
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'
import BaseAlbumsSimpleList from '@/lists/albums/BaseAlbumsSimpleList.vue'

export default {
  name: 'SearchAlbumsList',
  components: {
    BasePaginatedContainer,
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
  computed: {
    albumsDataFormatted () {
      return {
        page: 1,
        total_pages: 1,
        albums: this.albumsFormatted
      }
    },
    albumsFormatted () {
      return [
        ...this.albums
      ].reverse()
    },
    totalCount () {
      return this.albums.length
    }
  },
  methods: {
    handleLinkClick () {
      this.hideModal()
    },
    handleDeleteButtonClick ({ uuid }) {
      const isMatchedAlbum = albumData => {
        return albumData.uuid !== uuid
      }

      const albums = this.albums.filter(
        isMatchedAlbum
      )

      this.$emit(
        'change',
        { scope: 'albums' },
        albums
      )
    },
    handleFocus () {
      this.$emit('focus')
    }
  }
}
</script>

<style lang="sass" scoped></style>
