<template>
  <div
    class="ui page modal main-image-modal-container"
    ref="modal"
  >
    <slot></slot>
  </div>
</template>

<script>
import { setModal } from '#/actions/plugins/semantic'
import { mainModalOptions } from '#/data/plugins/semantic'
import { remove } from '#/actions/plugins/jquery'

export default {
  name: 'BaseImageModalContainer',
  emits: [
    'init',
    'show'
  ],
  computed: {
    modalOptions () {
      return mainModalOptions({
        onShow: this.handleShow
      })
    }
  },
  mounted () {
    setModal(
      this.$refs.modal,
      this.modalOptions
    )

    this.$emit('init', this.$refs.modal)
  },
  unmounted () {
    remove(this.$refs.modal)
  },
  methods: {
    handleShow () {
      this.$emit('show')
    }
  }
}
</script>

<style lang="sass" scoped>
.main-image-modal-container
  @extend .no-margin, .no-shadow, .width-fit-content
  background: transparent !important
</style>
