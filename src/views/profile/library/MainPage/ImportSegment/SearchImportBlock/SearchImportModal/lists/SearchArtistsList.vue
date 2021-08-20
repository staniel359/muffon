<template>
  <BasePaginatedContainer
    v-if="artists.length"
    ref="pagination"
    scope="artists"
    :responseData="artistsDataFormatted"
    :clientPageLimit="20"
    :responsePageLimit="totalCount"
    isReset
    isWithPagination
    @focus="handleFocus"
  >
    <template #default="slotProps">
      <BaseArtistsSimpleList
        :artists="slotProps.artists"
        isWithClearButton
        @linkClick="handleLinkClick"
        @deleteButtonClick="handleDeleteButtonClick"
      />
    </template>
  </BasePaginatedContainer>
</template>

<script>
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'
import BaseArtistsSimpleList from '@/lists/artists/BaseArtistsSimpleList.vue'

export default {
  name: 'SearchArtistsList',
  components: {
    BasePaginatedContainer,
    BaseArtistsSimpleList
  },
  inject: [
    'hideModal'
  ],
  props: {
    artists: {
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
    artistsDataFormatted () {
      return {
        page: 1,
        total_pages: 1,
        artists: this.artistsFormatted
      }
    },
    artistsFormatted () {
      return [
        ...this.artists
      ].reverse()
    },
    totalCount () {
      return this.artists.length
    }
  },
  methods: {
    handleLinkClick () {
      this.hideModal()
    },
    handleDeleteButtonClick ({ uuid }) {
      const isMatchedArtist = artistData => {
        return artistData.uuid !== uuid
      }

      const artists = this.artists.filter(
        isMatchedArtist
      )

      this.$emit(
        'change',
        { scope: 'artists' },
        artists
      )
    },
    handleFocus () {
      this.$emit('focus')
    }
  }
}
</script>

<style lang="sass" scoped></style>
