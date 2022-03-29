<template>
  <BaseModalContainer ref="modal">
    <BaseSegmentContainer
      ref="scrollable"
      :class="[
        'scrolling content',
        'main-modal-content-full-height',
        'main-segment-container'
      ]"
      :isLoading="isLoading"
      @init="handleInit"
    >
      <BasePaginatedListContainer
        :scope="scope"
        :isLoading="isLoading"
        :error="error"
        :responseData="compatibilityData"
        :clientPageLimit="limit"
        :responsePageLimit="limit"
        @fetchData="fetchData"
        @refresh="handleRefresh"
        @focus="handleFocus"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
          ></slot>
        </template>
      </BasePaginatedListContainer>
    </BaseSegmentContainer>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '*/components/containers/modals/BaseModalContainer.vue'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'
import getLibraryCompatibility
  from '*/helpers/actions/api/library/compatibility/get'

export default {
  name: 'BaseProfileLibraryCommonModalContainer',
  components: {
    BaseModalContainer,
    BaseSegmentContainer,
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
      scrollable: null,
      error: null,
      isOpen: false,
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
  watch: {
    isOpen: 'handleIsOpenChange'
  },
  methods: {
    handleInit (el) {
      this.scrollable = el
    },
    handleIsOpenChange (value) {
      if (value) {
        this.fetchData()
      }
    },
    handleRefresh (page) {
      this.fetchData(page)
    },
    handleFocus () {
      this.scrollable.scrollTo(0, 0)
    },
    getLibraryCompatibility,
    fetchData (page) {
      this.getLibraryCompatibility({
        ...this.libraryCompatibilityArgs,
        page
      })
    },
    show () {
      this.$refs.modal.show()

      this.isOpen = true
    },
    hide () {
      this.$refs.modal.hide()
    }
  }
}
</script>

<style lang="sass" scoped></style>
