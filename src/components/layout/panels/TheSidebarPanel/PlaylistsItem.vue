<template>
  <BaseSidebarItem
    icon="file audio"
    :text="playlistsText"
    :link="playlistsLink"
  />
</template>

<script>
import BaseSidebarItem from '*/components/BaseSidebarItem.vue'
import {
  playlists as formatProfilePlaylistsLink
} from '*/helpers/formatters/links/profile'

export default {
  name: 'PlaylistsItem',
  components: {
    BaseSidebarItem
  },
  props: {
    profileId: {
      type: String,
      required: true
    }
  },
  computed: {
    playlistsText () {
      return this.$t(
        'navigation.playlists'
      )
    },
    playlistsLink () {
      return formatProfilePlaylistsLink(
        {
          profileId: this.profileId
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
