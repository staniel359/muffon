<template>
  <BaseButton
    class="basic"
    icon="headphones"
    :text="libraryText"
    @click="handleClick"
  />

  <BasePlaylistLibraryImportModal
    ref="modal"
    :playlist-id="playlistId"
  />
</template>

<script>
import BaseButton from '*/components/buttons/BaseButton.vue'
import BasePlaylistLibraryImportModal
  from '*/components/modals/playlist/BasePlaylistLibraryImportModal.vue'

export default {
  name: 'LibraryImportButton',
  components: {
    BaseButton,
    BasePlaylistLibraryImportModal
  },
  props: {
    playlistId: String
  },
  computed: {
    libraryText () {
      return this.$t(
        'actions.from.library'
      )
    }
  },
  methods: {
    handleClick () {
      this.showModal()
    },
    showModal () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
