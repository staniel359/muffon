<template>
  <BaseListContainer class="selection">
    <PlaylistItem
      v-for="playlistData in playlistsCollection"
      :key="playlistData.uuid"
      :playlist-data="playlistData"
      :is-with-profile-nickname="isWithProfileNickname"
      :is-with-share-option="isWithShareOption"
      :is-with-delete-option="isWithDeleteOption"
      :is-clearable="isClearable"
      @link-click="handleLinkClick"
      @delete-option-click="handleDeleteOptionClick"
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
    isWithProfileNickname: Boolean,
    isWithShareOption: Boolean,
    isWithDeleteOption: Boolean,
    isClearable: Boolean
  },
  emits: [
    'linkClick',
    'deleteOptionClick'
  ],
  computed: {
    playlistsCollection () {
      return formatCollection(
        this.playlists
      )
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    handleDeleteOptionClick (
      {
        uuid
      }
    ) {
      this.$emit(
        'deleteOptionClick',
        {
          uuid
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
