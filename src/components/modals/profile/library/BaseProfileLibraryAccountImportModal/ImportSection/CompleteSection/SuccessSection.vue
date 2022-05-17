<template>
  <div
    ref="section"
    class="main-modal-import-section"
  >
    <div class="main-library-modal-message-container">
      <BaseMessage
        class="success"
        :icons="[
          'check'
        ]"
        :header="successHeaderText"
        :content="successContentText"
      />
    </div>

    <BasePaginatedListContainer
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
          is-with-album-title
          is-with-image
          is-with-created
          is-with-clear-button
          @link-click="handleLinkClick"
          @clear-button-click="handleClearButtonClick"
        />
      </template>
    </BasePaginatedListContainer>
  </div>

  <BaseSaveButton
    @click="handleSaveButtonClick"
  />
</template>

<script>
import BaseMessage from '*/components/messages/BaseMessage.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'
import BaseSaveButton from '*/components/buttons/BaseSaveButton.vue'
import {
  number as formatNumber
} from '*/helpers/formatters'

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
      limit: 50,
      scope: 'tracks'
    }
  },
  computed: {
    successHeaderText () {
      return this.$tc(
        'import.success.tracks.header',
        this.totalCount,
        {
          counter: this.counterText
        }
      )
    },
    counterText () {
      return this.$tc(
        'counters.nominative.tracks',
        this.totalCount,
        {
          count: this.totalCountFormatted
        }
      )
    },
    totalCountFormatted () {
      return formatNumber(
        this.totalCount
      )
    },
    successContentText () {
      return this.$t(
        'import.success.tracks.content'
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
      this.setStatus(
        'save'
      )

      this.setTracks(
        [
          ...this.tracks
        ]
      )
    },
    handleFocus () {
      this.focus()
    },
    handleLinkClick () {
      this.hideModal()
    },
    handleClearButtonClick (
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

      this.setSuccessTracks(
        [
          ...tracks
        ]
      )
    },
    focus () {
      this.$refs
        .section
        .scrollTo(
          0,
          0
        )
    }
  }
}
</script>

<style lang="sass" scoped></style>
