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
      :response-data="filesData"
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
          @delete-option-click="handleDeleteOptionClick"
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
    'setSuccessFiles',
    'setStatus',
    'setFiles',
    'hideModal'
  ],
  props: {
    files: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      limit: 50,
      scope: 'files'
    }
  },
  computed: {
    successHeaderText () {
      return this.$t(
        'import.success.tracks.header',
        {
          counter: this.counterText
        }
      )
    },
    counterText () {
      return this.$tc(
        `counters.nominative.${this.scope}`,
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
    totalCount () {
      return this.files.length
    },
    filesData () {
      return {
        page: 1,
        total_pages: 1,
        files: this.files
      }
    }
  },
  methods: {
    handleSaveButtonClick () {
      this.setStatus(
        'save'
      )

      this.setFiles(
        this.files
      )
    },
    handleFocus () {
      this.focus()
    },
    handleLinkClick () {
      this.hideModal()
    },
    handleDeleteOptionClick (
      {
        uuid
      }
    ) {
      function isMatchedFile (
        fileData
      ) {
        return fileData.uuid !== uuid
      }

      const files =
        this.files.filter(
          isMatchedFile
        )

      this.setSuccessFiles(
        [
          ...files
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
