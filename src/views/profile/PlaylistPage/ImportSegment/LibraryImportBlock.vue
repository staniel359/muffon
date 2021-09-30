<template>
  <BaseButton
    class="primary import-button"
    icon="headphones"
    :text="addFormatted"
    @click="handleClick"
  />

  <LibraryImportModal
    ref="modal"
    :playlistId="playlistId"
    :profileId="profileId"
  />
</template>

<script>
import BaseButton from '@/BaseButton.vue'
import LibraryImportModal from './LibraryImportBlock/LibraryImportModal.vue'

export default {
  name: 'LibraryImportBlock',
  components: {
    BaseButton,
    LibraryImportModal
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
