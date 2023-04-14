<template>
  <div
    v-if="isRender || isCalled"
    ref="modal"
    class="ui page modal main-modal"
    :class="size"
  >
    <slot />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import {
  mainModalOptions
} from '@/helpers/formatters/plugins/semantic'
import {
  setModal,
  showModal,
  hideModal
} from '@/helpers/actions/plugins/semantic'
import {
  toggleClass
} from '@/helpers/actions/plugins/jquery'

export default {
  name: 'BaseModalContainer',
  props: {
    size: {
      type: String,
      default: 'tiny'
    },
    isRender: Boolean,
    isMultiple: Boolean
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
      layoutStore,
      [
        'isDarkMode'
      ]
    ),
    modalOptions () {
      return mainModalOptions(
        {
          isMultiple: this.isMultiple,
          onShow: this.handleShow,
          onVisible: this.handleVisible
        }
      )
    }
  },
  watch: {
    isDarkMode:
      'handleIsDarkModeChange'
  },
  methods: {
    handleIsDarkModeChange () {
      this.toggleDarkMode()
    },
    handleShow () {
      this.toggleDarkMode()

      this.$emit(
        'show'
      )
    },
    handleVisible () {
      this.$emit(
        'visible'
      )
    },
    toggleDarkMode () {
      this.toggleModalDarkMode()

      this.toggleDimmerDarkMode()
    },
    toggleModalDarkMode () {
      toggleClass(
        this.$refs.modal,
        'inverted',
        this.isDarkMode
      )
    },
    toggleDimmerDarkMode () {
      toggleClass(
        $(
          '.ui.modals'
        ),
        'inverted',
        !this.isDarkMode
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
