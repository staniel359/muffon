<template>
  <div
    class="main-options-popup-container"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <BaseButton
      ref="button"
      v-bind="$attrs"
      class="compact basic circular options-button"
      icon="dotsVertical"
      :class="{
        visible: isMenuActive
      }"
      :is-transparent="isTransparent"
      @click.prevent.stop
      @mouseenter="handleButtonMouseEnter"
    />

    <div class="main-popup-container">
      <BaseOptionsPopupMenuContainer
        ref="popup"
        @active-change="handleMenuActiveChange"
      >
        <slot
          :is-visible="isVisible"
        />
      </BaseOptionsPopupMenuContainer>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseOptionsPopupMenuContainer from './BaseOptionsPopupMenuContainer.vue'
import optionsPopupOptions
  from '@/helpers/formatters/plugins/semantic/options/popup/options'
import popupMixin from '@/mixins/popupMixin'
import {
  show as showPopup,
  hide as hidePopup,
  reposition as repositionPopup
} from '@/helpers/actions/plugins/semantic/popup'

export default {
  name: 'BaseOptionsPopupContainer',
  components: {
    BaseButton,
    BaseOptionsPopupMenuContainer
  },
  mixins: [
    popupMixin
  ],
  provide () {
    return {
      changeSubmenuActive:
        this.changeSubmenuActive,
      hidePopup: this.hide
    }
  },
  props: {
    isTransparent: {
      type: Boolean,
      default: true
    },
    isInline: Boolean,
    isShowToTop: Boolean
  },
  emits: [
    'activeChange',
    'menuActiveChange'
  ],
  data () {
    return {
      isVisible: false,
      isMenuActive: false,
      isSubmenuActive: false,
      transitionDuration: 150
    }
  },
  computed: {
    element () {
      return this.$refs.button.$el
    },
    popupOptions () {
      return optionsPopupOptions(
        {
          html: this.popup,
          isInline: this.isInline,
          isShowToTop: this.isShowToTop,
          onShow: this.handleShow,
          onHide: this.handleHide,
          onHidden: this.handleHidden
        }
      )
    }
  },
  watch: {
    isSubmenuActive:
      'handleIsSubmenuActiveChange'
  },
  methods: {
    async handleShow () {
      this.isVisible = true

      await this.$nextTick()

      repositionPopup(
        this.element
      )
    },
    handleHide () {
      return !this.isSubmenuActive
    },
    handleHidden () {
      this.isVisible = false
    },
    handleMouseEnter () {
      this.changeActive(
        true
      )
    },
    handleMouseLeave () {
      this.changeActive(
        false
      )
    },
    handleMenuActiveChange (
      value
    ) {
      this.isMenuActive = value

      this.$emit(
        'menuActiveChange',
        value
      )
    },
    handleIsSubmenuActiveChange (
      value
    ) {
      if (!value) {
        setTimeout(
          this.hideIfInactive,
          this.transitionDuration
        )
      }
    },
    handleButtonMouseEnter () {
      this.initialize()

      showPopup(
        this.element
      )
    },
    changeActive (
      value
    ) {
      this.$emit(
        'activeChange',
        value
      )
    },
    changeSubmenuActive (
      value
    ) {
      this.isSubmenuActive = value
    },
    hide () {
      this.isSubmenuActive = false

      hidePopup(
        this.element
      )
    },
    hideIfInactive () {
      if (!this.isMenuActive) {
        this.hide()
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.options-button
  &.visible
    @extend .visibility-visible
</style>
