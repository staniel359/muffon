<template>
  <BaseImportErrorSection
    ref="section"
    scope="tracks"
    :error-collection="errorTracks"
  >
    <BasePaginatedListContainer
      :response-data="errorTracksData"
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
    'setErrorTracks',
    'hideModal'
  ],
  props: {
    errorTracks: {
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
      function isMatchedTrack (
        trackData
      ) {
        return trackData.uuid !== uuid
      }

      const errorTracks =
        this.errorTracks.filter(
          isMatchedTrack
        )

      this.setErrorTracks(
        [
          ...errorTracks
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
