<template>
  <BaseProfileLibraryArtistPageContainer
    ref="pageContainer"
    :profileId="profileId"
    :artistId="artistId"
    :scope="scope"
    :responsePageLimit="responsePageLimit"
    :pageNameKey="pageNameKey"
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

        <BasePaginatedContainer
          ref="paginatedContainer"
          :isLoading="pageSlotProps.isLoading"
          :error="pageSlotProps.error"
          :responseData="pageSlotProps.libraryArtistData"
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
              :artistName="pageSlotProps.artistName"
            ></slot>
          </template>
        </BasePaginatedContainer>
      </BaseSegmentContainer>
    </template>
  </BaseProfileLibraryArtistPageContainer>
</template>

<script>
import BaseProfileLibraryArtistPageContainer
  from './BaseProfileLibraryArtistPageContainer.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BaseViewChangeButtons from '@/BaseViewChangeButtons.vue'
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'

export default {
  name: 'BaseProfileLibraryArtistPaginatedPageContainer',
  components: {
    BaseProfileLibraryArtistPageContainer,
    BaseSegmentContainer,
    BasePaginatedContainer,
    BaseViewChangeButtons
  },
  props: {
    profileId: String,
    artistId: String,
    scope: String,
    clientPageLimit: Number,
    responsePageLimit: Number,
    pageNameKey: String,
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
