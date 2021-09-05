<template>
  <div
    class="main-library-modal-success-section"
    ref="scrollable"
  >
    <div class="main-library-modal-message-container">
      <BaseMessage
        class="success"
        :icons="['check']"
        :header="messageHeaderFormatted"
        :content="messageContentFormatted"
      />
    </div>

    <BasePaginatedContainer
      scope="tracks"
      :responseData="tracksData"
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

  <BaseProfileLibrarySaveButton
    @click="handleSaveButtonClick"
  />
</template>

<script>
import BaseMessage from '@/BaseMessage.vue'
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'
import BaseProfileLibrarySaveButton
  from '@/models/profile/library/BaseProfileLibrarySaveButton.vue'
import { localize } from '#/actions/plugins/i18n'
import { number as formatNumber } from '#/formatters'

export default {
  name: 'SuccessSection',
  components: {
    BaseMessage,
    BasePaginatedContainer,
    BaseTracksSimpleList,
    BaseProfileLibrarySaveButton
  },
  inject: [
    'setSuccessTracks',
    'setStatus',
    'setTracks',
    'hideModal'
  ],
  props: {
    tracks: {
      type: Array,
      required: true
    }
  },
  computed: {
    messageHeaderFormatted () {
      return localize(
        'pages.library.add.import.success.tracks.header',
        { count: this.totalCountFormatted }
      )
    },
    totalCountFormatted () {
      return formatNumber(
        this.totalCount
      )
    },
    messageContentFormatted () {
      return localize(
        'pages.library.add.import.success.tracks.content'
      )
    },
    tracksData () {
      return {
        page: 1,
        total_pages: 1,
        tracks: this.tracks
      }
    },
    totalCount () {
      return this.tracks.length
    }
  },
  methods: {
    handleSaveButtonClick () {
      this.setStatus('save')
      this.setTracks(
        [...this.tracks]
      )
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

      const tracks = this.tracks.filter(
        isMatchedTrack
      )

      this.setSuccessTracks(
        [...tracks]
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
