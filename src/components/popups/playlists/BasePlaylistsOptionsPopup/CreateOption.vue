<template>
  <BaseOption
    icon="create"
    :text="createText"
    @click="handleClick"
  />

  <BasePlaylistCreateModal
    ref="modal"
    is-with-redirect
  />
</template>

<script>
import BaseOption from '@/components/popups/options/BaseOption.vue'
import BasePlaylistCreateModal
  from '@/components/modals/playlist/BasePlaylistCreateModal.vue'

export default {
  name: 'CreateOption',
  components: {
    BaseOption,
    BasePlaylistCreateModal
  },
  inject: [
    'hidePopup'
  ],
  computed: {
    createText () {
      return this.$t(
        'actions.create'
      )
    }
  },
  methods: {
    handleClick () {
      this.hidePopup()

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
