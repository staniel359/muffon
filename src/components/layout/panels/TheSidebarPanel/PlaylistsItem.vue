<template>
  <BaseLinkContainer
    class="item main-sidebar-item"
    :link="playlistsLink"
  >
    <div class="main-sidebar-item-icon-container">
      <i class="file audio grey icon"></i>
    </div>

    <div class="main-sidebar-item-content-container">
      <BaseHeader
        tag="h4"
        :text="playlistsText"
      />
    </div>
  </BaseLinkContainer>
</template>

<script>
import { mapState } from 'vuex'
import BaseLinkContainer from '@/containers/links/BaseLinkContainer.vue'
import BaseHeader from '@/BaseHeader.vue'
import {
  playlists as formatProfilePlaylistsLink
} from '#/formatters/links/profile'

export default {
  name: 'PlaylistsItem',
  components: {
    BaseLinkContainer,
    BaseHeader
  },
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    playlistsLink () {
      return formatProfilePlaylistsLink({
        profileId: this.profileId
      })
    },
    profileId () {
      return this.profileInfo.id.toString()
    },
    playlistsText () {
      return this.$t(
        'layout.navigation.playlists'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
