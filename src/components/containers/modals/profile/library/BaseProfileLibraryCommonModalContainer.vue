<template>
  <BaseModalContentContainer
    ref="modal"
    :response-data="compatibilityData"
    :is-loading="isLoading"
    :error="error"
    @call="handleCall"
    @refresh="handleRefresh"
  >
    <template #default>
      <BasePaginatedListContainer
        :response-data="compatibilityData"
        :scope="scope"
        :limit="limit"
        :is-loading="isLoading"
        :error="error"
        @fetch-data="fetchData"
        @refresh="handleRefresh"
        @focus="handleFocus"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
          />
        </template>
      </BasePaginatedListContainer>
    </template>
  </BaseModalContentContainer>
</template>

<script>
import BaseModalContentContainer
  from '*/components/containers/modals/BaseModalContentContainer.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'
import getLibraryCompatibility
  from '*/helpers/actions/api/library/compatibility/get'

export default {
  name: 'BaseProfileLibraryCommonModalContainer',
  components: {
    BaseModalContentContainer,
    BasePaginatedListContainer
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
    }
  },
  methods: {
    getLibraryCompatibility,
    handleCall () {
      this.fetchData()
    },
    handleRefresh (
      page
    ) {
      this.fetchData(
        page
      )
    },
    handleFocus () {
      this.scrollToTop()
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
    show () {
      this.$refs
        .modal
        .show()
    },
    hide () {
      this.$refs
        .modal
        .hide()
    },
    scrollToTop () {
      this.$refs
        .modal
        .scrollToTop()
    }
  }
}
</script>

<style lang="sass" scoped></style>
