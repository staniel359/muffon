<template>
  <div class="the-variants-panel fixed width-100 pointer-events-none overflow-hidden">
    <div class="ui container main-container">
      <div
        class="variants-content-container relative"
        :class="{
          visible: isVisible
        }"
      >
        <VariantsLabel
          :is-panel-visible="isVisible"
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

<style lang="sass" scoped></style>
