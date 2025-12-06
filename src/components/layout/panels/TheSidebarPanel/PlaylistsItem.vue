<template>
  <BaseSidebarItem
    icon="playlist"
    :text="text"
    :link-data="linkData"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseSidebarItem from '@/components/BaseSidebarItem.vue'
import {
  playlists as formatProfilePlaylistsLinkData
} from '@/helpers/formatters/links/profile'
import {
  playlists as formatPlaylistsLinkData
} from '@/helpers/formatters/links'

export default {
  name: 'PlaylistsItem',
  components: {
    BaseSidebarItem
  },
  props: {
    profileId: Number
  },
  computed: {
    ...mapState(
      profileStore,
      {
        currentProfileId: 'id'
      }
    ),
    text () {
      return this.$t(
        'navigation.playlists'
      )
    },
    linkData () {
      if (this.currentProfileId) {
        return formatProfilePlaylistsLinkData(
          {
            profileId: this.profileId
          }
        )
      } else {
        return formatPlaylistsLinkData()
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
