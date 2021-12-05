<template>
  <BaseButton
    class="primary import-button"
    icon="headphones"
    :text="addFormatted"
    @click="handleClick"
  />

  <BasePlaylistLibraryImportModal
    ref="modal"
    :playlistId="playlistId"
    :profileId="profileId"
  />
</template>

<script>
import BaseButton from '@/buttons/BaseButton.vue'
import BasePlaylistLibraryImportModal
  from '@/modals/playlist/BasePlaylistLibraryImportModal.vue'

export default {
  name: 'LibraryImportBlock',
  components: {
    BaseButton,
    BasePlaylistLibraryImportModal
  },
  props: {
    playlistId: String,
    profileId: String
  },
  computed: {
    addFormatted () {
      return this.$t(
        'buttons.from.library'
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
