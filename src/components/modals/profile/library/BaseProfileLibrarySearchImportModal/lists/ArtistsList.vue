<template>
  <BasePaginatedListContainer
    v-if="artists.length"
    scope="artists"
    :responseData="artistsData"
    :clientPageLimit="limit"
    :responsePageLimit="totalCount"
    isReset
    isWithPagination
    @focus="handleFocus"
  >
    <template #default="slotProps">
      <BaseArtistsSimpleList
        :artists="slotProps.artists"
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
  from '*/components/containers/lists/BasePaginatedListContainer.vue'
import BaseArtistsSimpleList
  from '*/components/lists/artists/BaseArtistsSimpleList.vue'

export default {
  name: 'ArtistsList',
  components: {
    BasePaginatedListContainer,
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
  data () {
    return {
      limit: 20
    }
  },
  computed: {
    artistsData () {
      return {
        page: 1,
        total_pages: 1,
        artists: this.artistsReversed
      }
    },
    artistsReversed () {
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
