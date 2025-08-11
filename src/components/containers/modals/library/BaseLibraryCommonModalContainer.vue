<template>
  <BasePaginatedSegmentModalContainer
    ref="modal"
    :response-data="compatibilityData"
    :is-loading="isLoading"
    :error="error"
    :scope="scope"
    :limit="limit"
    @call="handleCall"
  >
    <template
      #default="slotProps"
    >
      <slot
        :[scope]="slotProps[scope]"
        :top-tracks-count="topTracksCount"
        :top-albums-count="topAlbumsCount"
      />
    </template>
  </BasePaginatedSegmentModalContainer>
</template>

<script>
import BasePaginatedSegmentModalContainer
  from '@/components/containers/modals/BasePaginatedSegmentModalContainer.vue'
import getLibraryCompatibility
  from '@/helpers/actions/api/library/compatibility/get'
import modalMixin from '@/mixins/modalMixin'

export default {
  name: 'BaseLibraryCommonModalContainer',
  components: {
    BasePaginatedSegmentModalContainer
  },
  mixins: [
    modalMixin
  ],
  props: {
    profileId: {
      type: Number,
      required: true
    },
    scope: {
      type: String,
      required: true
    },
    limit: Number
  },
  data () {
    return {
      compatibilityData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    libraryCompatibilityArgs () {
      return {
        otherProfileId: this.profileId,
        scope: this.scope,
        limit: this.limit
      }
    },
    topTracksCount () {
      return this.compatibilityData.top_tracks_count
    },
    topAlbumsCount () {
      return this.compatibilityData.top_albums_count
    }
  },
  methods: {
    getLibraryCompatibility,
    getData (
      {
        page
      } = {}
    ) {
      this.getLibraryCompatibility(
        {
          ...this.libraryCompatibilityArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
