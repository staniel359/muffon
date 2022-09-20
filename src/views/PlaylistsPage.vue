<template>
  <BasePlaylistsPageContainer
    ref="page"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        :response-data="pageSlotProps.playlistsData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :scope="scope"
        :limit="limit"
      >
        <template #default="slotProps">
          <BasePlaylistsSimpleList
            :playlists="slotProps[scope]"
            is-with-profile-nickname
            is-with-share-option
            is-with-delete-option
          />
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BasePlaylistsPageContainer>
</template>

<script>
import BasePlaylistsPageContainer
  from '@/components/containers/pages/playlists/BasePlaylistsPageContainer.vue'
import BasePaginatedPageContainer
  from '@/components/containers/pages/BasePaginatedPageContainer.vue'
import BasePlaylistsSimpleList
  from '@/components/lists/playlists/BasePlaylistsSimpleList.vue'
import paginatedPageMixin from '@/mixins/paginatedPageMixin'

export default {
  name: 'PlaylistsPage',
  components: {
    BasePlaylistsPageContainer,
    BasePaginatedPageContainer,
    BasePlaylistsSimpleList
  },
  mixins: [
    paginatedPageMixin
  ],
  data () {
    return {
      limit: 50,
      scope: 'playlists'
    }
  }
}
</script>

<style lang="sass" scoped></style>
