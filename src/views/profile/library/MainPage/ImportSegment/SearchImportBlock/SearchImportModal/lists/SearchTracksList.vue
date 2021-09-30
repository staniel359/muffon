<template>
  <BasePaginatedContainer
    v-if="tracks.length"
    ref="pagination"
    scope="tracks"
    :responseData="tracksDataFormatted"
    :clientPageLimit="50"
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
  </BasePaginatedContainer>
</template>

<script>
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'

export default {
  name: 'SearchTracksList',
  components: {
    BasePaginatedContainer,
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
  computed: {
    tracksDataFormatted () {
      return {
        page: 1,
        total_pages: 1,
        tracks: this.tracksFormatted
      }
    },
    tracksFormatted () {
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
        { scope: 'tracks' },
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
