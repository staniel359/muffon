<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionButton
        :text="buttonText"
        is-delete
        @click="handleDeleteButtonClick"
      />

      <DeleteModal
        ref="modal"
      />
    </div>
  </div>
</template>

<script>
import BaseSettingsOptionButton
  from '@/components/buttons/settings/BaseSettingsOptionButton.vue'
import DeleteModal from './DeleteOption/DeleteModal.vue'

export default {
  name: 'DeleteOption',
  components: {
    BaseSettingsOptionButton,
    DeleteModal
  },
  computed: {
    buttonText () {
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
