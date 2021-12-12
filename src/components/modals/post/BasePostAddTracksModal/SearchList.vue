<template>
  <BasePaginatedListContainer
    v-if="tracks.length"
    ref="pagination"
    scope="tracks"
    :responseData="tracksData"
    :clientPageLimit="limit"
    :responsePageLimit="totalCount"
    isReset
    isWithPagination
    @focus="handleFocus"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps.tracks"
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
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'

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
      limit: 50
    }
  },
  computed: {
    tracksData () {
      return {
        page: 1,
        total_pages: 1,
        tracks: this.tracksReversed
      }
    },
    tracksReversed () {
      return [
        ...this.tracks
      ].reverse()
    },
    totalCount () {
      return this.tracks.length
    }
  },
  methods: {
    handleLinkClick () {
      this.hideModal()
    },
    handleDeleteButtonClick ({ uuid }) {
      const isMatchedTrack = trackData => {
        return trackData.uuid !== uuid
      }

      const tracks = this.tracks.filter(
        isMatchedTrack
      )

      this.$emit(
        'change',
        tracks
      )
    },
    handleFocus () {
      this.$emit('focus')
    }
  }
}
</script>

<style lang="sass" scoped></style>
