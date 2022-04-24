<template>
  <div
    v-if="isRender"
    ref="modal"
    class="ui page modal main-modal"
  >
    <slot />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import {
  mainModalOptions
} from '*/helpers/data/plugins/semantic'
import {
  setModal,
  showModal,
  hideModal
} from '*/helpers/actions/plugins/semantic'
import {
  toggleClass,
  remove
} from '*/helpers/actions/plugins/jquery'

export default {
  name: 'BaseModalContainer',
  props: {
    isImageModal: Boolean
  },
  emits: [
    'show',
    'visible'
  ],
  data () {
    return {
      isCalled: false
    }
  },
  computed: {
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    ),
    isRender () {
      return (
        this.isCalled ||
          this.isImageModal
      )
    },
    modalOptions () {
      return mainModalOptions(
        {
          onShow: this.handleShow,
          onVisible: this.handleVisible
        }
      )
    }
  },
  watch: {
    isDarkMode: {
      immediate: true,
      handler: 'handleIsDarkModeChange'
    }
  },
  beforeUnmount () {
    remove(
      this.$refs.modal
    )
  },
  methods: {
    async handleIsDarkModeChange () {
      await this.$nextTick()

      this.toggleInvertedClass()
    },
    handleShow () {
      this.$emit(
        'show'
      )
    },
    handleVisible () {
      this.$emit(
        'visible'
      )
    },
    toggleInvertedClass () {
      toggleClass(
        this.$refs.modal,
        'inverted',
        this.isDarkMode
      )
    },
    async show () {
      if (!this.isCalled) {
        this.isCalled = true

        await this.$nextTick()

        setModal(
          this.$refs.modal,
          this.modalOptions
        )
      }

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
