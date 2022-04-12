<template>
  <BaseArtistPageContainer
    :artistName="artistName"
    :scope="scope"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        responseDataName="artistData"
        :slotPropsData="pageSlotProps"
        :artistName="pageSlotProps.artistName"
        :isWithArtistSelect="isWithArtistSelect"
        :isWithViewChange="isWithViewChange"
        :viewIndex="viewIndex"
        :scope="scope"
        :limit="limit"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
            :artistName="pageSlotProps.artistName"
            :topTrackCount="pageSlotProps.topTrackCount"
            :profileId="pageSlotProps.profileId"
          ></slot>
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
