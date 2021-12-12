<template>
  <BaseButton
    class="primary import-button"
    icon="search"
    :text="searchText"
    @click="handleClick"
  />

  <BasePlaylistSearchImportModal
    ref="modal"
    :playlistId="playlistId"
  />
</template>

<script>
import BaseButton from '@/buttons/BaseButton.vue'
import BasePlaylistSearchImportModal
  from '@/modals/playlist/BasePlaylistSearchImportModal.vue'

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
        'buttons.from.search'
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
