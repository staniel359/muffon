<template>
  <div class="option">
    <div class="option-header">
      <BaseButton
        class="red circular option-button"
        icon="delete"
        :text="deleteLibraryText"
        :is-invertable="false"
        @click="handleDeleteButtonClick"
      />
    </div>

    <DeleteModal
      ref="modal"
    />
  </div>
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'
import DeleteModal from './DeleteLibraryOption/DeleteModal.vue'

export default {
  name: 'DeleteLibraryOption',
  components: {
    BaseButton,
    DeleteModal
  },
  computed: {
    deleteLibraryText () {
      return this.$t(
        'settings.options.profile.data.library.delete'
      )
    }
  },
  methods: {
    handleDeleteButtonClick () {
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
