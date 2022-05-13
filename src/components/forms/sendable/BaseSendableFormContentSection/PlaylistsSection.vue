<template>
  <BasePlaylistsSimpleList
    :playlists="playlists"
    is-with-profile-nickname
    is-with-delete-option
    is-clearable
    @link-click="handleLinkClick"
    @delete-option-click="handleDeleteOptionClick"
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
    handleDeleteOptionClick (
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
