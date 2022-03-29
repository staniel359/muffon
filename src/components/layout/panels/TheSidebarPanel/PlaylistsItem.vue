<template>
  <BaseSidebarItem
    icon="file audio"
    :text="playlistsText"
    :link="playlistsLink"
  />
</template>

<script>
import { mapState } from 'vuex'
import BaseSidebarItem from '*/components/BaseSidebarItem.vue'
import {
  playlists as formatProfilePlaylistsLink
} from '*/helpers/formatters/links/profile'

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
        'navigation.playlists'
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
