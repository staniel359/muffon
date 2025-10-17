<template>
  <BaseArtistPageContainer
    ref="page"
    :artist-name="artistName"
    :scope="scope"
    :limit="limit"
    @refresh="handleRefresh"
  >
    <template
      #default="pageSlotProps"
    >
      <BasePaginatedPageContainer
        ref="pagination"
        :response-data="pageSlotProps.artistData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :artist-name="pageSlotProps.artistName"
        :is-with-top-segment="isWithTopSegment"
        :is-with-top-second-segment="isWithTopSecondSegment"
        :is-with-play-button="isWithPlayButton"
        :is-with-view-change="isWithViewChange"
        :is-with-reload-button="isWithReloadButton"
        :view-id="viewId"
        :scope="scope"
        :list-scope="listScope"
        :limit="limit"
        :response-page-limit="pageSlotProps.responsePageLimit"
      >
        <template
          #top
        >
          <slot
            name="top"
          />
        </template>

        <template
          #topExtra
        >
          <slot
            name="topExtra"
            :artist-name="pageSlotProps.artistName"
          />
        </template>

        <template
          #topPlayButton
        >
          <slot
            name="topPlayButton"
          />
        </template>

        <template
          #default="slotProps"
        >
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
  from '@/components/containers/pages/BasePaginatedPageContainer.vue'
import paginatedPageMixin from '@/mixins/paginatedPageMixin'

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
    listScope: String,
    limit: Number,
    isWithTopSegment: Boolean,
    isWithViewChange: Boolean,
    viewId: String,
    isWithReloadButton: Boolean
  }
}
</script>

<style lang="sass" scoped></style>
