<template>
  <BasePaginatedListContainer
    :response-data="tracksData"
    :scope="scope"
    :limit="limit"
    :response-page-limit="tracksCount"
    is-reset
    is-with-pagination
    @focus="handleFocus"
  >
    <template
      #default="slotProps"
    >
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        is-with-artist-name
        is-with-album-title
        is-with-image
        is-with-source
        is-with-created
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
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import {
  tracks as tracksLimits
} from '@/helpers/data/limits'

export default {
  name: 'TracksList',
  components: {
    BasePaginatedListContainer,
    BaseTracksSimpleList
  },
  inject: [
    'deleteCollectionItem',
    'hideModal'
  ],
  props: {
    tracks: {
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
        tracksLimits.simple.large,
      scope: 'tracks'
    }
  },
  computed: {
    tracksData () {
      return {
        page: 1,
        total_pages: 1,
        tracks: this.tracks
      }
    },
    tracksCount () {
      return this.tracks.length
    }
  },
  methods: {
    handleFocus () {
      this.$emit(
        'focus'
      )
    },
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
          collection: 'errorTracks',
          uuid
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
