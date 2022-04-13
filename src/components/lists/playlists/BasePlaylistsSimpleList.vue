<template>
  <BaseListContainer class="selection">
    <PlaylistItem
      v-for="playlistData in playlistsCollection"
      :key="playlistData.uuid"
      :playlist-data="playlistData"
      :is-with-profile="isWithProfile"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer
  from '*/components/containers/lists/BaseListContainer.vue'
import PlaylistItem from './BasePlaylistsSimpleList/PlaylistItem.vue'
import {
  collection as formatCollection
} from '*/helpers/formatters'

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
    isWithProfile: Boolean
  },
  computed: {
    playlistsCollection () {
      return formatCollection(
        this.playlists
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
