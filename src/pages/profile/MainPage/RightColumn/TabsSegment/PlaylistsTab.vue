<template>
  <BaseProfilePaginatedTabContainer
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    :is-active="isActive"
    @focus="handleFocus"
  >
    <template
      #default="slotProps"
    >
      <BasePlaylistsSimpleList
        :playlists="slotProps[scope]"
        is-with-created
        is-with-share-option
        is-with-edit-option
        is-with-delete-option
      />
    </template>
  </BaseProfilePaginatedTabContainer>
</template>

<script>
import BaseProfilePaginatedTabContainer
  from '@/components/containers/tabs/profile/BaseProfilePaginatedTabContainer.vue'
import BasePlaylistsSimpleList
  from '@/components/lists/playlists/BasePlaylistsSimpleList.vue'
import {
  playlists as playlistsLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'PlaylistsTab',
  components: {
    BaseProfilePaginatedTabContainer,
    BasePlaylistsSimpleList
  },
  mixins: [
    tabMixin
  ],
  props: {
    profileId: String
  },
  data () {
    return {
      limit:
        playlistsLimits.simple.extrasmall,
      scope: 'playlists'
    }
  }
}
</script>

<style lang="sass" scoped></style>
