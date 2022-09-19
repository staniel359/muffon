<template>
  <BaseSidebarItem
    icon="file audio"
    :text="playlistsText"
    :link="playlistsLink"
  />
</template>

<script>
import {
  mapGetters
} from 'vuex'
import BaseSidebarItem from '*/components/BaseSidebarItem.vue'
import {
  playlists as formatProfilePlaylistsLink
} from '*/helpers/formatters/links/profile'
import {
  playlists as formatPlaylistsLink
} from '*/helpers/formatters/links'

export default {
  name: 'PlaylistsItem',
  components: {
    BaseSidebarItem
  },
  props: {
    profileId: String
  },
  computed: {
    ...mapGetters(
      'profile',
      {
        currentProfileId: 'id'
      }
    ),
    playlistsText () {
      return this.$t(
        'navigation.playlists'
      )
    },
    playlistsLink () {
      if (this.currentProfileId) {
        return formatProfilePlaylistsLink(
          {
            profileId: this.profileId
          }
        )
      } else {
        return formatPlaylistsLink()
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
