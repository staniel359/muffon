<template>
  <div
    class="main-library-modal-retry-section"
    ref="scrollable"
  >
    <div class="main-library-modal-message-container">
      <BaseMessage
        class="error"
        :header="messageHeaderFormatted"
      />
    </div>

    <BasePaginatedContainer
      scope="tracks"
      :responseData="errorTracksData"
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
          isWithAlbumTitle
          isWithImage
          isWithCreated
          isWithClearButton
          @linkClick="handleLinkClick"
          @deleteButtonClick="handleDeleteButtonClick"
        />
      </template>
    </BasePaginatedContainer>
  </div>

  <BaseProfileLibraryRetryButton
    @click="handleRetryButtonClick"
  />
</template>

<script>
import BaseMessage from '@/BaseMessage.vue'
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'
import BaseProfileLibraryRetryButton
  from '@/models/profile/library/BaseProfileLibraryRetryButton.vue'
import { localize } from '#/actions/plugins/i18n'
import { number as formatNumber } from '#/formatters'

export default {
  name: 'RetrySection',
  components: {
    BaseMessage,
    BasePaginatedContainer,
    BaseTracksSimpleList,
    BaseProfileLibraryRetryButton
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
  computed: {
    messageHeaderFormatted () {
      return localize(
        'pages.library.add.account.error.save.header',
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
