<template>
  <BaseProfileLibraryTagPageContainer
    :profile-id="profileId"
    :tag-id="tagId"
    :scope="scope"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        response-data-name="libraryTagData"
        :slot-props-data="pageSlotProps"
        :scope="scope"
        :limit="limit"
        :is-with-view-change="isWithViewChange"
        :view-index="viewIndex"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
            :top-tracks-count="pageSlotProps.topTracksCount"
            :top-albums-count="pageSlotProps.topAlbumsCount"
          />
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseProfileLibraryTagPageContainer>
</template>

<script>
import BaseProfileLibraryTagPageContainer
  from './BaseProfileLibraryTagPageContainer.vue'
import BasePaginatedPageContainer
  from '*/components/containers/pages/BasePaginatedPageContainer.vue'

export default {
  name: 'BaseProfileLibraryTagPaginatedPageContainer',
  components: {
    BaseProfileLibraryTagPageContainer,
    BasePaginatedPageContainer
  },
  props: {
    profileId: String,
    tagId: String,
    scope: String,
    limit: Number,
    isWithViewChange: Boolean,
    viewIndex: Number
  }
}
</script>

<style lang="sass" scoped></style>
