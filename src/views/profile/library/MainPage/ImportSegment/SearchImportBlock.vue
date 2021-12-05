<template>
  <BaseButton
    class="primary import-button"
    icon="search"
    :text="addFormatted"
    @click="handleClick"
  />

  <BaseProfileLibrarySearchImportModal ref="modal" />
</template>

<script>
import BaseButton from '@/buttons/BaseButton.vue'
import BaseProfileLibrarySearchImportModal
  from '@/modals/profile/library/BaseProfileLibrarySearchImportModal.vue'

export default {
  name: 'SearchImportBlock',
  components: {
    BaseButton,
    BaseProfileLibrarySearchImportModal
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
