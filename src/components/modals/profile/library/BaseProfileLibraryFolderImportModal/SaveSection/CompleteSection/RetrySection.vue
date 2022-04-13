<template>
  <div
    ref="scrollable"
    class="main-modal-import-section"
  >
    <div class="main-library-modal-message-container">
      <BaseMessage
        class="error"
        :header="errorText"
      />
    </div>

    <BasePaginatedListContainer
      :response-data="errorFilesData"
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
          is-with-delete-option
          is-clearable
          @link-click="handleLinkClick"
          @delete-button-click="handleDeleteButtonClick"
        />
      </template>
    </BasePaginatedListContainer>
  </div>

  <BaseRetryButton
    @click="handleRetryButtonClick"
  />
</template>

<script>
import BaseMessage from '*/components/messages/BaseMessage.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'
import BaseRetryButton from '*/components/buttons/BaseRetryButton.vue'
import {
  number as formatNumber
} from '*/helpers/formatters'

export default {
  name: 'RetrySection',
  components: {
    BaseMessage,
    BasePaginatedListContainer,
    BaseTracksSimpleList,
    BaseRetryButton
  },
  inject: [
    'setErrorFiles',
    'hideModal'
  ],
  props: {
    errorFiles: {
      type: Array,
      required: true
    }
  },
  emits: [
    'retry'
  ],
  data () {
    return {
      limit: 50,
      scope: 'files'
    }
  },
  computed: {
    errorText () {
      return this.$t(
        'save.error.tracks',
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
    errorFilesData () {
      return {
        page: 1,
        total_pages: 1,
        files: this.errorFiles
      }
    },
    totalCount () {
      return this.errorFiles.length
    }
  },
  methods: {
    handleRetryButtonClick () {
      this.$emit(
        'retry'
      )
    },
    handleFocus () {
      this.$refs
        .scrollable
        .scrollTo(
          0,
          0
        )
    },
    handleLinkClick () {
      this.hideModal()
    },
    handleDeleteButtonClick (
      {
        uuid
      }
    ) {
      function isMatchedFile (
        fileData
      ) {
        return fileData.uuid !== uuid
      }

      const errorFiles =
        this.errorFiles.filter(
          isMatchedFile
        )

      this.setErrorFiles(
        [
          ...errorFiles
        ]
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
