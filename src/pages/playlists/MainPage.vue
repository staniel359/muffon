<template>
  <BasePlaylistsPaginatedPageContainer
    :key="refreshKey"
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
import pageMixin from '@/mixins/pageMixin'
import {
  playlists as playlistsLimits
} from '@/helpers/data/limits'

export default {
  name: 'MainPage',
  components: {
    BasePlaylistsPaginatedPageContainer,
    BasePlaylistsSimpleList
  },
  mixins: [
    orderChangeMixin,
    pageMixin
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
