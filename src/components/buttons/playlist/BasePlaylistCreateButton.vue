<template>
  <BaseButton
    class="basic circular"
    icon="plus"
    :text="createText"
    @click="handleButtonClick"
  />

  <BasePlaylistCreateModal
    ref="modal"
    :is-with-redirect="isWithRedirect"
    @success="handleSuccess"
  />
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'
import BasePlaylistCreateModal
  from '@/components/modals/playlist/BasePlaylistCreateModal.vue'

export default {
  name: 'BasePlaylistCreateButton',
  components: {
    BaseButton,
    BasePlaylistCreateModal
  },
  props: {
    isWithRedirect: Boolean
  },
  emits: [
    'success'
  ],
  computed: {
    createText () {
      return this.$t(
        'actions.addModel.playlist'
      )
    }
  },
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
