<template>
  <BaseButton
    class="basic circular"
    icon="plus"
    :text="createText"
    @click="handleButtonClick"
  />

  <BasePlaylistCreateModal
    ref="modal"
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
    showModal () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
