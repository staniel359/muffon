<template>
  <BaseOption
    icon="add"
    :text="addText"
    :options="options"
  />

  <BasePlaylistSearchImportModal
    ref="searchModal"
    :playlist-id="playlistId"
  />

  <BasePlaylistLibraryImportModal
    ref="libraryModal"
    :playlist-id="playlistId"
  />
</template>

<script>
import BaseOption from '@/components/dropdowns/options/BaseOption.vue'
import BasePlaylistSearchImportModal
  from '@/components/modals/playlist/import/BasePlaylistSearchImportModal.vue'
import BasePlaylistLibraryImportModal
  from '@/components/modals/playlist/import/BasePlaylistLibraryImportModal.vue'

export default {
  name: 'AddOption',
  components: {
    BaseOption,
    BasePlaylistSearchImportModal,
    BasePlaylistLibraryImportModal
  },
  props: {
    playlistId: String
  },
  computed: {
    addText () {
      return this.$t(
        'actions.add'
      )
    },
    options () {
      return [
        {
          icon: 'search',
          text: this.$t(
            'actions.from.search'
          ),
          onClick: this.showSearchModal
        },
        {
          icon: 'library',
          text: this.$t(
            'actions.from.library'
          ),
          onClick: this.showLibraryModal
        }
      ]
    }
  },
  methods: {
    showSearchModal () {
      this.$refs
        .searchModal
        .show()
    },
    showLibraryModal () {
      this.$refs
        .libraryModal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
