<template>
  <BaseSidebarItem
    icon="file audio"
    :text="playlistsText"
    :link="playlistsLink"
  />
</template>

<script>
import { mapState } from 'vuex'
import BaseSidebarItem from '@/BaseSidebarItem.vue'
import {
  playlists as formatProfilePlaylistsLink
} from '#/formatters/links/profile'

export default {
  name: 'PlaylistsItem',
  components: {
    BaseSidebarItem
  },
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    playlistsText () {
      return this.$t(
        'layout.navigation.playlists'
      )
    },
    playlistsLink () {
      return formatProfilePlaylistsLink({
        profileId: this.profileId
      })
    },
    profileId () {
      return this.profileInfo.id.toString()
    }
  }
}
</script>

<style lang="sass" scoped></style>
