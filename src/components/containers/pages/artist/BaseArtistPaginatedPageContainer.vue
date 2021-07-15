<template>
  <BaseArtistPageContainer
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
        <BaseViewChangeButtons
          v-if="isWithViewChange"
          :viewIndex="viewIndex"
          @viewButtonClick="handleViewButtonClick"
        />

        <template v-if="isWithArtistSelect">
          <BaseAlbumsSourceSelect
            :artistName="pageSlotProps.artistData.name"
            @artistDataChange="handleArtistDataChange"
          />

          <BaseDivider />
        </template>

        <BasePaginatedContainer
          ref="paginatedContainer"
          :isLoading="pageSlotProps.isLoading"
          :error="pageSlotProps.error"
          :responseData="pageSlotProps.artistData"
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
              :artistName="pageSlotProps.artistData.name"
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
import BaseViewChangeButtons from '@/BaseViewChangeButtons.vue'
import BaseAlbumsSourceSelect from '@/models/artist/BaseAlbumsSourceSelect.vue'
import BaseDivider from '@/BaseDivider.vue'
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'

export default {
  name: 'BaseArtistPaginatedPageContainer',
  components: {
    BaseArtistPageContainer,
    BaseSegmentContainer,
    BaseViewChangeButtons,
    BaseAlbumsSourceSelect,
    BaseDivider,
    BasePaginatedContainer
  },
  props: {
    pageNameKey: String,
    scope: String,
    clientPageLimit: Number,
    responsePageLimit: Number,
    isWithViewChange: Boolean,
    viewIndex: Number,
    isWithArtistSelect: Boolean
  },
  emits: [
    'viewButtonClick'
  ],
  methods: {
    handleViewButtonClick (index) {
      this.$refs.paginatedContainer.reset()

      this.$emit('viewButtonClick', index)

      this.$refs.pageContainer.fetchData()
    },
    handleArtistDataChange () {
      this.$refs.paginatedContainer.reset()
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
