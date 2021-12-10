<template>
  <div
    class="ui page modal main-modal"
    ref="modal"
  >
    <slot></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mainModalOptions } from '#/data/plugins/semantic'
import { setModal, showModal, hideModal } from '#/actions/plugins/semantic'
import { toggleClass, remove } from '#/actions/plugins/jquery'

export default {
  name: 'BaseModalContainer',
  emits: [
    'init',
    'show',
    'visible'
  ],
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ]),
    modalOptions () {
      return mainModalOptions({
        onShow: this.handleShow,
        onVisible: this.handleVisible
      })
    }
  },
  watch: {
    isDarkMode: {
      immediate: true,
      handler: 'handleIsDarkModeChange'
    }
  },
  mounted () {
    setModal(
      this.$refs.modal,
      this.modalOptions
    )

    this.$emit(
      'init',
      this.$refs.modal
    )
  },
  beforeUnmount () {
    remove(
      this.$refs.modal
    )
  },
  methods: {
    handleIsDarkModeChange () {
      this.$nextTick(() => {
        this.toggleInvertedClass()
      })
    },
    handleShow () {
      this.$emit('show')
    },
    handleVisible () {
      this.$emit('visible')
    },
    toggleInvertedClass () {
      toggleClass(
        this.$refs.modal,
        'inverted',
        this.isDarkMode
      )
    },
    show () {
      showModal(
        this.$refs.modal
      )
    },
    hide () {
      hideModal(
        this.$refs.modal
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
