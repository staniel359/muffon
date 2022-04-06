<template>
  <BaseButton
    class="basic"
    icon="plus"
    :text="createText"
    @click="handleButtonClick"
  />

  <BasePlaylistCreateModal
    ref="modal"
  />
</template>

<script>
import BaseButton from '*/components/buttons/BaseButton.vue'
import BasePlaylistCreateModal
  from '*/components/modals/playlist/BasePlaylistCreateModal.vue'

export default {
  name: 'BasePlaylistCreateButton',
  components: {
    BaseButton,
    BasePlaylistCreateModal
  },
  computed: {
    createText () {
      return this.$t(
        'actions.add.playlist'
      )
    }
  },
  methods: {
    handleButtonClick () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
