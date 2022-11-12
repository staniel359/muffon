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
  name: 'BaseProfileLibraryCommonModalContainer',
  components: {
    BasePaginatedSegmentModalContainer
  },
  mixins: [
    modalMixin
  ],
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
