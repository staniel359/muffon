<template>
  <BaseImportErrorSection
    ref="section"
    scope="tracks"
    :error-collection="errorFiles"
  >
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
          is-with-clear-button
          @link-click="handleLinkClick"
          @clear-button-click="handleClearButtonClick"
        />
      </template>
    </BasePaginatedListContainer>
  </BaseImportErrorSection>
</template>

<script>
import BaseImportErrorSection
  from '*/components/sections/import/BaseImportErrorSection.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'

export default {
  name: 'ErrorSection',
  components: {
    BaseImportErrorSection,
    BasePaginatedListContainer,
    BaseTracksSimpleList
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
  data () {
    return {
      limit: 50,
      scope: 'files'
    }
  },
  computed: {
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
    },
    focus () {
      this.$refs
        .section
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
