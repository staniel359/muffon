<template>
  <BaseVideoPlaylistPageContainer
    ref="page"
    :playlist-id="playlistId"
    :scope="scope"
    :limit="limit"
  >
    <template
      #default="pageSlotProps"
    >
      <BasePaginatedPageContainer
        :response-data="pageSlotProps.playlistData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :scope="scope"
        :limit="limit"
        is-pagination-simple
      >
        <template
          #default="slotProps"
        >
          <slot
            :[scope]="slotProps[scope]"
          />
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseVideoPlaylistPageContainer>
</template>

<script>
import BaseVideoPlaylistPageContainer
  from './BaseVideoPlaylistPageContainer.vue'
import BasePaginatedPageContainer
  from '@/components/containers/pages/BasePaginatedPageContainer.vue'
import paginatedPageMixin from '@/mixins/paginatedPageMixin'

export default {
  name: 'BaseVideoPlaylistPaginatedPageContainer',
  components: {
    BaseVideoPlaylistPageContainer,
    BasePaginatedPageContainer
  },
  mixins: [
    paginatedPageMixin
  ],
  props: {
    playlistId: String,
    scope: String,
    limit: Number
  }
}
</script>

<style lang="sass" scoped></style>
