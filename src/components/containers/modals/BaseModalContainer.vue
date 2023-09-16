<template>
  <div
    v-if="isRender || isCalled"
    ref="modal"
    class="ui page modal base-modal"
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

<style lang="sass" scoped>
.base-modal
  & > :deep(.content)
    @extend .no-margin
    &.full-height
      @extend .d-flex, .flex-column
      height: $mainModalHeight
      .base-tab
        @extend .absolute, .overflow-y-auto
    &.scrolling
      @extend .scroll-smooth
  &:not(.main-delete-modal)
    & > :deep(.content)
      max-height: $mainModalHeight !important
  &.inverted
    &:not(.base-image-modal)
      @extend .background-black, .border-inverted
    & > :deep(.header),
    & > :deep(.content),
    & > :deep(.actions)
      @extend .background-black
    & > :deep(.header)
      border-bottom: $borderInverted
    & > :deep(.actions)
      border-top: $borderInverted
</style>
