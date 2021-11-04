<template>
  <BaseTagPageContainer
    ref="pageContainer"
    :pageNameKey="pageNameKey"
    :scope="scope"
    :responsePageLimit="responsePageLimit"
  >
    <template #default="pageSlotProps">
      <BaseSegmentContainer
        :class="[
          'main-segment-container',
          'main-page-segment-container',
          'main-paginated-page-segment-container'
        ]"
        :isLoading="pageSlotProps.isLoading"
      >
        <template v-if="isWithViewChange">
          <BaseViewChangeButtons
            :viewIndex="viewIndex"
            @viewButtonClick="handleViewButtonClick"
          />

          <BaseDivider />
        </template>

        <BasePaginatedContainer
          ref="paginatedContainer"
          :isLoading="pageSlotProps.isLoading"
          :error="pageSlotProps.error"
          :responseData="pageSlotProps.tagData"
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
              :profileId="pageSlotProps.profileId"
            ></slot>
          </template>
        </BasePaginatedContainer>
      </BaseSegmentContainer>
    </template>
  </BaseTagPageContainer>
</template>

<script>
import BaseTagPageContainer from './BaseTagPageContainer.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BaseViewChangeButtons from '@/BaseViewChangeButtons.vue'
import BaseDivider from '@/BaseDivider.vue'
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'

export default {
  name: 'BaseTagPaginatedPageContainer',
  components: {
    BaseTagPageContainer,
    BaseSegmentContainer,
    BaseViewChangeButtons,
    BaseDivider,
    BasePaginatedContainer
  },
  props: {
    pageNameKey: String,
    scope: String,
    clientPageLimit: Number,
    responsePageLimit: Number,
    isWithViewChange: Boolean,
    viewIndex: Number
  },
  emits: [
    'viewButtonClick'
  ],
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
</style>
