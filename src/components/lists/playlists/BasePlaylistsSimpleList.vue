<template>
  <BaseListContainer class="selection">
    <PlaylistItem
      v-for="playlistData in playlistsFormatted"
      :key="playlistData.uuid"
      :playlistData="playlistData"
      :profileId="profileId"
      :isWithDeleteOption="isWithDeleteOption"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer from '@/containers/lists/BaseListContainer.vue'
import PlaylistItem from './BasePlaylistsSimpleList/PlaylistItem.vue'
import { collection as formatCollection } from '#/formatters'
import { isCurrentProfile } from '#/utils'

export default {
  name: 'BasePlaylistsSimpleList',
  components: {
    BaseListContainer,
    PlaylistItem
  },
  props: {
    playlists: {
      type: Array,
      default () {
        return []
      }
    },
    profileId: String
  },
  computed: {
    playlistsFormatted () {
      return formatCollection(
        this.playlists
      )
    },
    isWithDeleteOption () {
      return isCurrentProfile(
        this.profileId
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
