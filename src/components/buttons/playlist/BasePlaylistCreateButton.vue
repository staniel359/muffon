<template>
  <div>
    <BaseCreateButton
      model="playlist"
      @click="handleButtonClick"
    />

    <BasePlaylistCreateModal
      ref="modal"
      :is-with-redirect="isWithRedirect"
      @success="handleSuccess"
    />
  </div>
</template>

<script>
import BaseCreateButton from '@/components/buttons/BaseCreateButton.vue'
import BasePlaylistCreateModal
  from '@/components/modals/playlist/BasePlaylistCreateModal.vue'

export default {
  name: 'BasePlaylistCreateButton',
  components: {
    BaseCreateButton,
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
