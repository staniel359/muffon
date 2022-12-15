<template>
  <div>
    <i
      ref="icon"
      class="icon source-icon"
      :class="[
        source,
        size,
        {
          colored: isActive
        }
      ]"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
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
import BaseSourcePopup from '@/components/popups/BaseSourcePopup.vue'
import {
  sourcePopupOptions
} from '@/helpers/formatters/semantic'
import popupMixin from '@/mixins/popupMixin'

export default {
  name: 'BaseSourceIcon',
  components: {
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
      return this.$refs.icon
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
    handleMouseEnter () {
      this.isActive = true
    },
    handleMouseLeave () {
      this.isActive = false
    }
  }
}
</script>

<style lang="sass" scoped>
.source-icon
  @extend .no-padding, .no-margin
  min-width: unset !important
</style>
