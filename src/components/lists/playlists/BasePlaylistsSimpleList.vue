<template>
  <BaseListContainer class="selection">
    <PlaylistItem
      v-for="playlistData in playlistsCollection"
      :key="playlistData.uuid"
      :playlistData="playlistData"
      :isWithProfile="isWithProfile"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer from '@/containers/lists/BaseListContainer.vue'
import PlaylistItem from './BasePlaylistsSimpleList/PlaylistItem.vue'
import { collection as formatCollection } from '#/formatters'

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
