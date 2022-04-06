<template>
  <BaseButton
    class="basic import-button"
    icon="headphones"
    :text="libraryText"
    @click="handleClick"
  />

  <BasePlaylistLibraryImportModal
    ref="modal"
    :playlistId="playlistId"
  />
</template>

<script>
import BaseButton from '*/components/buttons/BaseButton.vue'
import BasePlaylistLibraryImportModal
  from '*/components/modals/playlist/BasePlaylistLibraryImportModal.vue'

export default {
  name: 'LibraryImportBlock',
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
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
