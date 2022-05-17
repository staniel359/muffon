<template>
  <BasePlaylistsSimpleList
    :playlists="playlists"
    is-with-profile-nickname
    is-with-clear-button
    @link-click="handleLinkClick"
    @clear-button-click="handleClearButtonClick"
  />
</template>

<script>
import BasePlaylistsSimpleList
  from '*/components/lists/playlists/BasePlaylistsSimpleList.vue'

export default {
  name: 'PlaylistsSection',
  components: {
    BasePlaylistsSimpleList
  },
  inject: [
    'deleteModel'
  ],
  props: {
    playlists: Array
  },
  emits: [
    'linkClick'
  ],
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    handleClearButtonClick (
      {
        uuid
      }
    ) {
      this.deleteModel(
        {
          uuid,
          scope: 'playlists'
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
