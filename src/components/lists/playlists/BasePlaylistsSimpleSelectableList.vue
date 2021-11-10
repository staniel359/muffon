<template>
  <BaseListContainer class="selection">
    <PlaylistItem
      v-for="playlistData in playlistsFormatted"
      :key="playlistData.uuid"
      :playlistData="playlistData"
      :profileId="profileId"
      :trackTitle="trackTitle"
      :artistName="artistName"
      :albumTitle="albumTitle"
      :imageUrl="imageUrl"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer from '@/containers/BaseListContainer.vue'
import PlaylistItem from './BasePlaylistsSimpleSelectableList/PlaylistItem.vue'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'BasePlaylistsSimpleSelectableList',
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
    profileId: String,
    trackTitle: String,
    artistName: String,
    albumTitle: String,
    imageUrl: String
  },
  computed: {
    playlistsFormatted () {
      return formatCollection(
        this.playlists
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
