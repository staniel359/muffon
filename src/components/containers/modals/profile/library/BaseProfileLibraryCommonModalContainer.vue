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
      :error="error"
      @init="handleInit"
    >
      <BasePaginatedListContainer
        v-if="compatibilityData"
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
import BaseModalContainer from '@/containers/modals/BaseModalContainer.vue'
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '@/containers/lists/BasePaginatedListContainer.vue'
import fetchProfileCompatibilityData
  from '#/actions/api/profile/library/compatibility/fetchData'

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
    profileCompatibilityDataArgs () {
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
    fetchProfileCompatibilityData,
    fetchData (page) {
      this.fetchProfileCompatibilityData({
        ...this.profileCompatibilityDataArgs,
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
