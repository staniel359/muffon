<template>
  <BasePaginatedListContainer
    v-if="tracks.length"
    :response-data="tracksData"
    :scope="scope"
    :limit="limit"
    :response-page-limit="totalCount"
    is-reset
    is-with-pagination
    @focus="handleFocus"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
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
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'

export default {
  name: 'SearchList',
  components: {
    BasePaginatedListContainer,
    BaseTracksSimpleList
  },
  inject: [
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
    'change',
    'focus'
  ],
  data () {
    return {
      limit: 50,
      scope: 'tracks'
    }
  },
  computed: {
    tracksData () {
      return {
        page: 1,
        total_pages: 1,
        tracks: [
          ...this.tracks
        ]
      }
    },
    totalCount () {
      return this.tracks.length
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
      function isMatchedTrack (
        trackData
      ) {
        return trackData.uuid !== uuid
      }

      const tracks =
        this.tracks.filter(
          isMatchedTrack
        )

      this.$emit(
        'change',
        tracks
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
