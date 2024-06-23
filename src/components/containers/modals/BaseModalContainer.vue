<template>
  <div
    v-if="isRender || isCalled"
    ref="modal"
    class="ui page modal base-modal"
    :class="size"
  >
    <slot
      :class="{
        inverted: isDarkMode
      }"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import {
  main as mainModalOptions
} from '@/helpers/formatters/plugins/semantic/options/modal'
import {
  set as setModal,
  show as showModal,
  hide as hideModal
} from '@/helpers/actions/plugins/semantic/modal'
import {
  toggleClass
} from '@/helpers/actions/plugins/jquery'
import transparencyMixin from '@/mixins/transparencyMixin'

export default {
  name: 'BaseModalContainer',
  mixins: [
    transparencyMixin
  ],
  props: {
    size: {
      type: String,
      default: 'small'
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
          onVisible: this.handleVisible,
          onHidden: this.handleHidden
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
    async handleHidden () {
      await this.$nextTick()

      this.toggleDarkMode()
    },
    toggleDarkMode () {
      this.toggleModalDarkMode()

      this.toggleDimmersDarkMode()
    },
    toggleModalDarkMode () {
      toggleClass(
        this.$refs.modal,
        'inverted',
        this.isDarkMode
      )
    },
    toggleDimmersDarkMode () {
      toggleClass(
        $(
          '.ui.dimmer.modals, .ui.dimmer.modals .ui.dimmer'
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
