<template>
  <BaseTopPageContainer
    ref="pageContainer"
    :scope="scope"
    :responsePageLimit="responsePageLimit"
  >
    <template #default="pageSlotProps">
      <div
        :class="[
          'ui segments',
          'main-segment-container',
          'main-page-segment-container',
          'main-paginated-page-segment-container'
        ]"
      >
        <BaseSegmentContainer
          v-if="isWithViewChange"
        >
          <BaseViewChangeButtons
            :viewIndex="viewIndex"
            @viewButtonClick="handleViewButtonClick"
          />
        </BaseSegmentContainer>

        <BaseSegmentContainer
          class="top-segment"
          :isLoading="pageSlotProps.isLoading"
        >
          <BasePaginatedContainer
            ref="paginatedContainer"
            :isLoading="pageSlotProps.isLoading"
            :error="pageSlotProps.error"
            :responseData="pageSlotProps.topData"
            :scope="scope"
            :clientPageLimit="clientPageLimit"
            :responsePageLimit="responsePageLimit"
            @focus="handleFocus"
            @fetchData="pageSlotProps.fetchData"
            @refresh="pageSlotProps.handleRefresh"
          >
            <template #default="slotProps">
              <slot
                :[scope]="slotProps[scope]"
              ></slot>
            </template>
          </BasePaginatedContainer>
        </BaseSegmentContainer>
      </div>
    </template>
  </BaseTopPageContainer>
</template>

<script>
import BaseTopPageContainer from './BaseTopPageContainer.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BaseViewChangeButtons from '@/BaseViewChangeButtons.vue'
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'

export default {
  name: 'BaseTopPaginatedPageContainer',
  components: {
    BaseTopPageContainer,
    BaseSegmentContainer,
    BaseViewChangeButtons,
    BasePaginatedContainer
  },
  props: {
    scope: String,
    clientPageLimit: Number,
    responsePageLimit: Number,
    isWithViewChange: Boolean,
    viewIndex: Number
  },
  emits: [
    'viewButtonClick'
  ],
  mounted () {
    this.$refs.pageContainer.fetchData()
  },
  methods: {
    handleViewButtonClick (index) {
      this.$refs.paginatedContainer.reset()

      this.$emit(
        'viewButtonClick',
        index
      )

      this.$nextTick(() => {
        this.$refs.pageContainer.fetchData()
      })
    },
    handleFocus () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="sass" scoped>
.main-paginated-page-segment-container
  @extend .flex-column

.top-segment
  @extend .flex-full, .d-flex, .flex-column
</style>
