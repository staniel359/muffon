<template>
  <BasePlaylistsPageContainer
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        response-data-name="playlistsData"
        :slot-props-data="pageSlotProps"
        :scope="scope"
        :limit="limit"
      >
        <template #default="slotProps">
          <BasePlaylistsSimpleList
            :playlists="slotProps[scope]"
            is-with-profile
          />
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BasePlaylistsPageContainer>
</template>

<script>
import BasePlaylistsPageContainer
  from '*/components/containers/pages/playlists/BasePlaylistsPageContainer.vue'
import BasePaginatedPageContainer
  from '*/components/containers/pages/BasePaginatedPageContainer.vue'
import BasePlaylistsSimpleList
  from '*/components/lists/playlists/BasePlaylistsSimpleList.vue'

export default {
  name: 'PlaylistsPage',
  components: {
    BasePlaylistsPageContainer,
    BasePaginatedPageContainer,
    BasePlaylistsSimpleList
  },
  data () {
    return {
      limit: 50,
      scope: 'playlists'
    }
  }
}
</script>

<style lang="sass" scoped></style>
