<template>
  <BaseArtistPageContainer
    ref="page"
    :artist-name="artistName"
    :scope="scope"
    :limit="limit"
    @request-artist-data-change="handleRequestArtistDataChange"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        ref="pagination"
        :response-data="pageSlotProps.artistData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :artist-name="pageSlotProps.artistName"
        :is-with-top-segment="isWithTopSegment"
        :is-with-view-change="isWithViewChange"
        :view-index="viewIndex"
        :scope="scope"
        :limit="limit"
      >
        <template #top>
          <slot
            name="top"
            :artist-name="pageSlotProps.artistName"
          />
        </template>

        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
            :artist-name="pageSlotProps.artistName"
            :top-track-count="pageSlotProps.topTrackCount"
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
import paginatedPageMixin from '*/mixins/paginatedPageMixin'

export default {
  name: 'BaseArtistPaginatedPageContainer',
  components: {
    BaseArtistPageContainer,
    BasePaginatedPageContainer
  },
  mixins: [
    paginatedPageMixin
  ],
  props: {
    artistName: String,
    scope: String,
    limit: Number,
    isWithTopSegment: Boolean,
    isWithViewChange: Boolean,
    viewIndex: Number
  },
  methods: {
    handleRequestArtistDataChange () {
      this.reset()
    }
  }
}
</script>

<style lang="sass" scoped></style>
