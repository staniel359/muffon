<template>
  <BaseArtistPageContainer
    :artist-name="artistName"
    :scope="scope"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        response-data-name="artistData"
        :slot-props-data="pageSlotProps"
        :artist-name="pageSlotProps.artistName"
        :is-with-artist-select="isWithArtistSelect"
        :is-with-view-change="isWithViewChange"
        :view-index="viewIndex"
        :scope="scope"
        :limit="limit"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
            :artist-name="pageSlotProps.artistName"
            :top-track-count="pageSlotProps.topTrackCount"
            :profile-id="pageSlotProps.profileId"
          />
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseArtistPageContainer>
</template>

<script>
import BaseArtistPageContainer from './BaseArtistPageContainer.vue'
import BasePaginatedPageContainer
  from '*/components/containers/pages/BasePaginatedPageContainer.vue'

export default {
  name: 'BaseArtistPaginatedPageContainer',
  components: {
    BaseArtistPageContainer,
    BasePaginatedPageContainer
  },
  props: {
    artistName: String,
    scope: String,
    limit: Number,
    isWithViewChange: Boolean,
    viewIndex: Number,
    isWithArtistSelect: Boolean
  }
}
</script>

<style lang="sass" scoped></style>
