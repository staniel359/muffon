<template>
  <i class="icon base-source-icon">
    <BaseIcon
      ref="icon"
      class="source-icon main-popup-icon"
      :class="{
        size,
        colored: isActive
      }"
      :icon="source"
      @active-change="handleActiveChange"
    />

    <div class="main-popup-container">
      <BaseSourcePopup
        ref="popup"
        :source="source"
      />
    </div>
  </i>
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseSourcePopup from '@/components/popups/BaseSourcePopup.vue'
import {
  source as sourcePopupOptions
} from '@/helpers/formatters/plugins/semantic/options/popup'
import popupMixin from '@/mixins/popupMixin'

export default {
  name: 'BaseSourceIcon',
  components: {
    BaseIcon,
    BaseSourcePopup
  },
  mixins: [
    popupMixin
  ],
  props: {
    source: {
      type: String,
      required: true
    },
    size: String
  },
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    element () {
      return this.$refs.icon.$el
    },
    popupOptions () {
      return sourcePopupOptions(
        {
          html: this.popup
        }
      )
    }
  },
  methods: {
    handleActiveChange (
      value
    ) {
      this.isActive = value
    }
  }
}
</script>

<style lang="sass" scoped>
.base-source-icon
  @extend .no-padding, .no-margin
  min-width: unset !important
  &.left
    margin-right: 0.75em !important
  &.right
    margin-left: 0.75em !important
  &.bottom
    margin-top: 0.75em !important

.source-icon
  @extend .no-padding, .no-margin
  min-width: unset !important
</style>
