<template>
  <BaseArtistPageContainer
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
        <BasePaginatedContainer
          :responseData="pageSlotProps.artistData"
          :isLoading="pageSlotProps.isLoading"
          :error="pageSlotProps.error"
          :scope="scope"
          :clientPageLimit="clientPageLimit"
          :responsePageLimit="responsePageLimit"
          @fetchData="pageSlotProps.fetchData"
          @refresh="pageSlotProps.handleRefresh"
          @focus="handleFocus"
        >
          <template #default="slotProps">
            <slot
              :[scope]="slotProps[scope]"
              :artistName="pageSlotProps.artistName"
              :topTrackCount="pageSlotProps.topTrackCount"
            ></slot>
          </template>
        </BasePaginatedContainer>
      </BaseSegmentContainer>
    </template>
  </BaseArtistPageContainer>
</template>

<script>
import BaseArtistPageContainer from './BaseArtistPageContainer.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'

export default {
  name: 'BaseArtistPaginatedPageContainer',
  components: {
    BaseArtistPageContainer,
    BaseSegmentContainer,
    BasePaginatedContainer
  },
  props: {
    pageNameKey: String,
    scope: String,
    clientPageLimit: Number,
    responsePageLimit: Number
  },
  methods: {
    handleFocus () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="sass" scoped></style>
