<template>
  <BaseButton
    class="primary"
    icon="plus"
    :text="createText"
    @click="handleButtonClick"
  />

  <BasePlaylistCreateModal
    ref="modal"
  />
</template>

<script>
import BaseButton from '@/buttons/BaseButton.vue'
import BasePlaylistCreateModal
  from '@/modals/playlist/BasePlaylistCreateModal.vue'

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
