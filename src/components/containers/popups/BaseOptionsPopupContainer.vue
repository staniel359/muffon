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
        [buttonClass]: !isTransparent,
        visible: isMenuActive
      }"
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
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseOptionsPopupMenuContainer from './BaseOptionsPopupMenuContainer.vue'
import {
  optionsPopupOptions
} from '@/helpers/formatters/semantic'
import popupMixin from '@/mixins/popupMixin'
import {
  showPopup,
  hidePopup,
  repositionPopup
} from '@/helpers/actions/plugins/semantic'

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
    }
  },
  emits: [
    'activeChange'
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
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    ),
    element () {
      return this.$refs.button.$el
    },
    popupOptions () {
      return optionsPopupOptions(
        {
          html: this.popup,
          onShow: this.handleShow,
          onHide: this.handleHide,
          onHidden: this.handleHidden
        }
      )
    },
    buttonClass () {
      if (this.isDarkMode) {
        return 'background-black'
      } else {
        return 'background-white'
      }
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
