<template>
  <BaseButton
    class="basic import-button"
    icon="search"
    :text="searchText"
    @click="handleClick"
  />

  <BaseProfileLibrarySearchImportModal
    ref="modal"
  />
</template>

<script>
import BaseButton from '*/components/buttons/BaseButton.vue'
import BaseProfileLibrarySearchImportModal
  from '*/components/modals/profile/library/BaseProfileLibrarySearchImportModal.vue'

export default {
  name: 'SearchImportBlock',
  components: {
    BaseButton,
    BaseProfileLibrarySearchImportModal
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
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
