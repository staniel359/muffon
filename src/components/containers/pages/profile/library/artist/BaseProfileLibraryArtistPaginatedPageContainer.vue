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
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'

export default {
  name: 'BaseProfileLibraryArtistPaginatedPageContainer',
  components: {
    BaseProfileLibraryArtistPageContainer,
    BaseSegmentContainer,
    BasePaginatedContainer
  },
  props: {
    profileId: String,
    artistId: String,
    scope: String,
    clientPageLimit: Number,
    responsePageLimit: Number,
    pageNameKey: String
  },
  methods: {
    handleFocus () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="sass" scoped></style>
