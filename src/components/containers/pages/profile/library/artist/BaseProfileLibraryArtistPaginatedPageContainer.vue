<template>
  <BaseProfileLibraryArtistPageContainer
    :profile-id="profileId"
    :artist-id="artistId"
    :scope="scope"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        response-data-name="libraryArtistData"
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

export default {
  name: 'BaseProfileLibraryArtistPaginatedPageContainer',
  components: {
    BaseProfileLibraryArtistPageContainer,
    BasePaginatedPageContainer
  },
  props: {
    profileId: String,
    artistId: String,
    scope: String,
    limit: Number
  }
}
</script>

<style lang="sass" scoped></style>
