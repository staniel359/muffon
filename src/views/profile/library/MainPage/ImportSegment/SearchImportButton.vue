<template>
  <BaseButton
    class="basic circular import-button"
    icon="search"
    :text="searchText"
    @click="handleClick"
  />

  <BaseLibrarySearchImportModal
    ref="modal"
  />
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseLibrarySearchImportModal
  from '@/components/modals/library/import/BaseLibrarySearchImportModal.vue'

export default {
  name: 'SearchImportButton',
  components: {
    BaseButton,
    BaseLibrarySearchImportModal
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
