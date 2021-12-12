<template>
  <div
    class="main-library-modal-success-section"
    ref="scrollable"
  >
    <div class="main-library-modal-message-container">
      <BaseMessage
        class="success"
        :icons="['check']"
        :header="successHeaderText"
        :content="successContentText"
      />
    </div>

    <BasePaginatedListContainer
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

  <BaseSaveButton
    @click="handleSaveButtonClick"
  />
</template>

<script>
import BaseMessage from '@/messages/BaseMessage.vue'
import BasePaginatedListContainer
  from '@/containers/lists/BasePaginatedListContainer.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'
import BaseSaveButton from '@/buttons/BaseSaveButton.vue'
import { number as formatNumber } from '#/formatters'

export default {
  name: 'SuccessSection',
  components: {
    BaseMessage,
    BasePaginatedListContainer,
    BaseTracksSimpleList,
    BaseSaveButton
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
  data () {
    return {
      limit: 50
    }
  },
  computed: {
    successHeaderText () {
      return this.$t(
        'shared.add.import.success.tracks.header',
        { count: this.totalCountFormatted }
      )
    },
    totalCountFormatted () {
      return formatNumber(
        this.totalCount
      )
    },
    successContentText () {
      return this.$t(
        'shared.add.import.success.tracks.content'
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
