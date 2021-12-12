<template>
  <div
    class="main-library-modal-retry-section"
    ref="scrollable"
  >
    <div class="main-library-modal-message-container">
      <BaseMessage
        class="error"
        :header="errorText"
      />
    </div>

    <BasePaginatedListContainer
      scope="tracks"
      :responseData="errorTracksData"
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
          isWithAlbumTitle
          isWithImage
          isWithCreated
          isWithDeleteOption
          isClearable
          @linkClick="handleLinkClick"
          @deleteButtonClick="handleDeleteButtonClick"
        />
      </template>
    </BasePaginatedListContainer>
  </div>

  <BaseRetryButton
    @click="handleRetryButtonClick"
  />
</template>

<script>
import BaseMessage from '@/messages/BaseMessage.vue'
import BasePaginatedListContainer
  from '@/containers/lists/BasePaginatedListContainer.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'
import BaseRetryButton from '@/buttons/BaseRetryButton.vue'
import { number as formatNumber } from '#/formatters'

export default {
  name: 'RetrySection',
  components: {
    BaseMessage,
    BasePaginatedListContainer,
    BaseTracksSimpleList,
    BaseRetryButton
  },
  inject: [
    'setErrorTracks',
    'hideModal'
  ],
  props: {
    errorTracks: {
      type: Array,
      required: true
    }
  },
  emits: [
    'retry'
  ],
  data () {
    return {
      limit: 50
    }
  },
  computed: {
    errorText () {
      return this.$t(
        'shared.add.save.error.tracks',
        { count: this.totalCountFormatted }
      )
    },
    totalCountFormatted () {
      return formatNumber(
        this.totalCount
      )
    },
    errorTracksData () {
      return {
        page: 1,
        total_pages: 1,
        tracks: this.errorTracks
      }
    },
    totalCount () {
      return this.errorTracks.length
    }
  },
  methods: {
    handleRetryButtonClick () {
      this.$emit('retry')
    },
    handleFocus () {
      this.$refs.scrollable.scrollTo(0, 0)
    },
    handleLinkClick () {
      this.hideModal()
    },
    handleDeleteButtonClick ({ uuid }) {
      const isMatchedTrack = trackData => {
        return trackData.uuid !== uuid
      }

      const errorTracks = this.errorTracks.filter(
        isMatchedTrack
      )

      this.setErrorTracks(
        [...errorTracks]
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
