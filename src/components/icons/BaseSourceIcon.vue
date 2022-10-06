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

    <BaseSourcePopup
      :source="source"
    />
  </div>
</template>

<script>
import BaseSourcePopup from '@/components/popups/BaseSourcePopup.vue'
import {
  setPopup
} from '@/helpers/actions/plugins/semantic'
import {
  sourcePopupOptions
} from '@/helpers/data/plugins/semantic'

export default {
  name: 'BaseSourceIcon',
  components: {
    BaseSourcePopup
  },
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
    popupOptions () {
      return sourcePopupOptions()
    }
  },
  mounted () {
    setPopup(
      this.$refs.icon,
      this.popupOptions
    )
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
