<template>
  <div class="variants-panel">
    <div class="ui container main-container">
      <div
        class="variants-block"
        :class="{ visible: isVisible }"
      >
        <VariantsLabel
          :isPanelVisible="isVisible"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
        />

        <VariantsList
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VariantsLabel from './VariantsPanel/VariantsLabel.vue'
import VariantsList from './VariantsPanel/VariantsList.vue'

export default {
  name: 'VariantsPanel',
  components: {
    VariantsLabel,
    VariantsList
  },
  data () {
    return {
      isVisible: false
    }
  },
  methods: {
    handleMouseEnter () {
      this.isVisible = true
    },
    handleMouseLeave () {
      this.isVisible = false
    }
  }
}
</script>

<style lang="sass" scoped>
.variants-panel
  @extend .fixed, .w-100, .pointer-events-none
  bottom: $playerPanelHeight
  z-index: 200

.variants-block
  @extend .relative
  width: 330px
  height: 0
  padding-top: 30px
  transition: 0.25s
  &.visible
    height: 280px
</style>
