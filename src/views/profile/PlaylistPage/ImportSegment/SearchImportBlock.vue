<template>
  <BaseButton
    class="basic import-button"
    icon="search"
    :text="searchText"
    @click="handleClick"
  />

  <BasePlaylistSearchImportModal
    ref="modal"
    :playlist-id="playlistId"
  />
</template>

<script>
import BaseButton from '*/components/buttons/BaseButton.vue'
import BasePlaylistSearchImportModal
  from '*/components/modals/playlist/BasePlaylistSearchImportModal.vue'

export default {
  name: 'SearchImportBlock',
  components: {
    BaseButton,
    BasePlaylistSearchImportModal
  },
  props: {
    playlistId: String
  },
  computed: {
    searchText () {
      return this.$t(
        'actions.from.search'
      )
    }
  },
  methods: {
    handleClick () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
