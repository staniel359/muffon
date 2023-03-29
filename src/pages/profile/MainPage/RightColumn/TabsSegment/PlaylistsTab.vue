<template>
  <BaseProfileTabContainer
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
  </BaseProfileTabContainer>
</template>

<script>
import BaseProfileTabContainer
  from '@/components/containers/tabs/profile/BaseProfileTabContainer.vue'
import BasePlaylistsSimpleList
  from '@/components/lists/playlists/BasePlaylistsSimpleList.vue'
import {
  playlists as playlistsLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'PlaylistsTab',
  components: {
    BaseProfileTabContainer,
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
