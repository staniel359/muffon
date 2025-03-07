<template>
  <div
    class="base-options-popup-container"
    :class="{
      visible: isVisible
    }"
  >
    <BaseButton
      ref="button"
      class="large compact basic circular options-button"
      icon="dotsVertical"
      :class="{
        simple: isTransparent
      }"
      :is-transparent="isTransparent"
      @click.prevent.stop="handleButtonClick"
    />

    <div
      v-if="isCalled"
      class="main-popup-container"
    >
      <BaseOptionsPopupMenuContainer
        ref="popup"
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
import BaseOptionsPopupMenuContainer
  from './BaseOptionsPopupMenuContainer.vue'
import optionsPopupOptions
  from '@/helpers/formatters/plugins/semantic/options/popup/options'
import popupMixin from '@/mixins/popupMixin'
import {
  hideAll as hideAllPopups,
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
      hidePopup: hideAllPopups
    }
  },
  props: {
    isTransparent: {
      type: Boolean,
      default: true
    },
    isShowToTop: Boolean,
    isNested: Boolean
  },
  emits: [
    'activeChange'
  ],
  data () {
    return {
      isVisible: false,
      isLazy: true
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
          isShowToTop: this.isShowToTop,
          isNested: this.isNested,
          onShow: this.handleShow,
          onHidden: this.handleHidden
        }
      )
    }
  },
  watch: {
    isVisible: 'handleIsVisibleChange'
  },
  methods: {
    async handleShow () {
      this.isVisible = true

      await this.$nextTick()

      repositionPopup(
        this.element
      )
    },
    handleHidden () {
      this.isVisible = false
    },
    handleIsVisibleChange (
      value
    ) {
      this.changeActive(
        value
      )
    },
    handleButtonClick () {
      this.isCalled = true
    },
    changeActive (
      value
    ) {
      this.$emit(
        'activeChange',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
