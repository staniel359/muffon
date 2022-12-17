<template>
  <div>
    <BaseIcon
      ref="icon"
      class="source-icon"
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
  </div>
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseSourcePopup from '@/components/popups/BaseSourcePopup.vue'
import {
  sourcePopupOptions
} from '@/helpers/formatters/semantic'
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
.source-icon
  @extend .no-padding, .no-margin
  min-width: unset !important
</style>
