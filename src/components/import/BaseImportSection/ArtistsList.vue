<template>
  <BasePaginatedListContainer
    :response-data="artistsData"
    :scope="scope"
    :limit="limit"
    :response-page-limit="artistsCount"
    is-reset
    is-with-pagination
    @focus="handleFocus"
  >
    <template
      #default="slotProps"
    >
      <BaseArtistsSimpleList
        :artists="slotProps[scope]"
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
import BaseArtistsSimpleList
  from '@/components/lists/artists/BaseArtistsSimpleList.vue'
import {
  artists as artistsLimits
} from '@/helpers/data/limits'

export default {
  name: 'ArtistsList',
  components: {
    BasePaginatedListContainer,
    BaseArtistsSimpleList
  },
  inject: [
    'deleteCollectionItem',
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
    'focus'
  ],
  data () {
    return {
      limit:
        artistsLimits.simple.large,
      scope: 'artists'
    }
  },
  computed: {
    artistsData () {
      return {
        page: 1,
        total_pages: 1,
        artists: this.artists
      }
    },
    artistsCount () {
      return this.artists.length
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
