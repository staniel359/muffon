<template>
  <BaseButton
    class="primary import-button"
    icon="search"
    :text="addFormatted"
    @click="handleClick"
  />

  <SearchImportModal ref="modal" />
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
  computed: {
    addFormatted () {
      return this.$t(
        'pages.library.add.buttons.search'
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
