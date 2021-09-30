<template>
  <BaseButton
    class="primary import-button"
    icon="search"
    :text="addFormatted"
    @click="handleClick"
  />

  <SearchImportModal
    ref="modal"
    :playlistId="playlistId"
  />
</template>

<script>
import BaseButton from '@/BaseButton.vue'
import SearchImportModal from './SearchImportBlock/SearchImportModal.vue'

export default {
  name: 'SearchImportBlock',
  components: {
    BaseButton,
    SearchImportModal
  },
  props: {
    playlistId: String
  },
  computed: {
    addFormatted () {
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
