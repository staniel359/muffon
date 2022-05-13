<template>
  <BasePaginatedListContainer
    v-if="artists.length"
    :response-data="artistsData"
    :scope="scope"
    :limit="limit"
    :response-page-limit="totalCount"
    is-reset
    is-with-pagination
    @focus="handleFocus"
  >
    <template #default="slotProps">
      <BaseArtistsSimpleList
        :artists="slotProps[scope]"
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
      limit: 20,
      scope: 'artists'
    }
  },
  computed: {
    artistsData () {
      return {
        page: 1,
        total_pages: 1,
        artists: [
          ...this.artists
        ]
      }
    },
    totalCount () {
      return this.artists.length
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
      function isMatchedArtist (
        artistData
      ) {
        return artistData.uuid !== uuid
      }

      const artists =
        this.artists.filter(
          isMatchedArtist
        )

      this.$emit(
        'change',
        artists
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
