<template>
  <BaseProfileLibraryArtistPageContainer
    ref="page"
    :profile-id="profileId"
    :library-artist-id="libraryArtistId"
    :scope="scope"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        response-data-name="artistData"
        :slot-props-data="pageSlotProps"
        :scope="scope"
        :limit="limit"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
            :artist-name="pageSlotProps.artistName"
          />
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseProfileLibraryArtistPageContainer>
</template>

<script>
import BaseProfileLibraryArtistPageContainer
  from './BaseProfileLibraryArtistPageContainer.vue'
import BasePaginatedPageContainer
  from '*/components/containers/pages/BasePaginatedPageContainer.vue'
import paginatedPageMixin from '*/mixins/paginatedPageMixin'

export default {
  name: 'BaseProfileLibraryArtistPaginatedPageContainer',
  components: {
    BaseProfileLibraryArtistPageContainer,
    BasePaginatedPageContainer
  },
  mixins: [
    paginatedPageMixin
  ],
  props: {
    profileId: String,
    libraryArtistId: String,
    scope: String,
    limit: Number
  }
}
</script>

<style lang="sass" scoped></style>
