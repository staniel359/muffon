<template>
  <BasePaginatedListContainer
    v-if="albums.length"
    scope="albums"
    :responseData="albumsData"
    :clientPageLimit="limit"
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
  </BasePaginatedListContainer>
</template>

<script>
import BasePaginatedListContainer
  from '@/containers/lists/BasePaginatedListContainer.vue'
import BaseAlbumsSimpleList from '@/lists/albums/BaseAlbumsSimpleList.vue'

export default {
  name: 'SearchAlbumsList',
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
      limit: 20
    }
  },
  computed: {
    albumsData () {
      return {
        page: 1,
        total_pages: 1,
        albums: this.albumsReversed
      }
    },
    albumsReversed () {
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
