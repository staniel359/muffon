<template>
  <BaseAddButton
    model="playlist"
    @click="handleButtonClick"
  />

  <BasePlaylistCreateModal
    ref="modal"
    :is-with-redirect="isWithRedirect"
    @success="handleSuccess"
  />
</template>

<script>
import BaseAddButton from '@/components/buttons/BaseAddButton.vue'
import BasePlaylistCreateModal
  from '@/components/modals/playlist/BasePlaylistCreateModal.vue'

export default {
  name: 'BasePlaylistCreateButton',
  components: {
    BaseAddButton,
    BasePlaylistCreateModal
  },
  props: {
    isWithRedirect: Boolean
  },
  emits: [
    'success'
  ],
  methods: {
    handleButtonClick () {
      this.showModal()
    },
    handleSuccess () {
      this.$emit(
        'success'
      )
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
