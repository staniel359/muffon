<template>
  <BaseListContainer class="selection">
    <PlaylistItem
      v-for="playlistData in playlistsCollection"
      :key="playlistData.uuid"
      :playlist-data="playlistData"
      :track-title="trackTitle"
      :artist-name="artistName"
      :album-title="albumTitle"
      :image-url="imageUrl"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer
  from '*/components/containers/lists/BaseListContainer.vue'
import PlaylistItem from './BasePlaylistsSimpleSelectableList/PlaylistItem.vue'
import {
  collection as formatCollection
} from '*/helpers/formatters'

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
    trackTitle: String,
    artistName: String,
    albumTitle: String,
    imageUrl: String
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
