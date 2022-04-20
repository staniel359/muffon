<template>
  <BasePaginatedSegmentModalContainer
    ref="modal"
    response-data-name="compatibilityData"
    :slot-props-data="slotPropsData"
    :scope="scope"
    :limit="limit"
    @call="handleCall"
  >
    <template #default="slotProps">
      <slot
        :[scope]="slotProps[scope]"
      />
    </template>
  </BasePaginatedSegmentModalContainer>
</template>

<script>
import BasePaginatedSegmentModalContainer
  from '*/components/containers/modals/BasePaginatedSegmentModalContainer.vue'
import getLibraryCompatibility
  from '*/helpers/actions/api/library/compatibility/get'

export default {
  name: 'BaseProfileLibraryCommonModalContainer',
  components: {
    BasePaginatedSegmentModalContainer
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    scope: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      compatibilityData: null,
      error: null,
      isLoading: false,
      limit: 50
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
    slotPropsData () {
      return {
        compatibilityData: this.compatibilityData,
        isLoading: this.isLoading,
        error: this.error,
        fetchData: this.fetchData,
        refresh: this.refresh
      }
    }
  },
  methods: {
    getLibraryCompatibility,
    handleCall () {
      this.fetchData()
    },
    fetchData (
      page
    ) {
      this.getLibraryCompatibility(
        {
          ...this.libraryCompatibilityArgs,
          page
        }
      )
    },
    refresh (
      page
    ) {
      this.fetchData(
        page
      )
    },
    show () {
      this.$refs
        .modal
        .show()
    },
    hide () {
      this.$refs
        .modal
        .hide()
    }
  }
}
</script>

<style lang="sass" scoped></style>
