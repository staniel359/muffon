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
      scope="files"
      :responseData="filesData"
      :limit="limit"
      :responsePageLimit="totalCount"
      isReset
      isWithPagination
      @focus="handleFocus"
    >
      <template #default="slotProps">
        <BaseTracksSimpleList
          :tracks="slotProps.files"
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
import BaseMessage from '*/components/messages/BaseMessage.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'
import BaseSaveButton from '*/components/buttons/BaseSaveButton.vue'
import { number as formatNumber } from '*/helpers/formatters'

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
      limit: 50
    }
  },
  computed: {
    successHeaderText () {
      return this.$t(
        'import.success.tracks.header',
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
      this.setStatus('save')
      this.setFiles(
        this.files
      )
    },
    handleFocus () {
      this.$refs.scrollable.scrollTo(0, 0)
    },
    handleLinkClick () {
      this.hideModal()
    },
    handleDeleteButtonClick ({ uuid }) {
      const isMatchedFile = fileData => {
        return fileData.uuid !== uuid
      }

      const files = this.files.filter(
        isMatchedFile
      )

      this.setSuccessFiles(
        [...files]
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
