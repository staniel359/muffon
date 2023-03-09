<template>
  <BasePlaylistsPaginatedPageContainer
    model="playlist"
    :scope="scope"
    :limit="limit"
    :order="order"
    is-with-top-segment
    is-with-order-change
  >
    <template
      #default="slotProps"
    >
      <BasePlaylistsSimpleList
        :playlists="slotProps[scope]"
        is-with-profile-nickname
        is-with-created
        is-with-share-option
        is-with-edit-option
        is-with-delete-option
      />
    </template>
  </BasePlaylistsPaginatedPageContainer>
</template>

<script>
import BasePlaylistsPaginatedPageContainer
  from '@/components/containers/pages/playlists/BasePlaylistsPaginatedPageContainer.vue'
import BasePlaylistsSimpleList
  from '@/components/lists/playlists/BasePlaylistsSimpleList.vue'
import orderChangeMixin from '@/mixins/orderChangeMixin'
import {
  playlists as playlistsLimits
} from '@/helpers/data/limits'

export default {
  name: 'PlaylistsPage',
  components: {
    BasePlaylistsPaginatedPageContainer,
    BasePlaylistsSimpleList
  },
  mixins: [
    orderChangeMixin
  ],
  data () {
    return {
      limit:
        playlistsLimits.simple.large,
      scope: 'playlists',
      order: 'createdDesc'
    }
  }
}
</script>

<style lang="sass" scoped></style>
