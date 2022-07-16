<template>
  <div
    ref="segment"
    :class="[
      'ui segments',
      'main-segment-container',
      {
        basic: isBasic,
        raised: !isBasic
      }
    ]"
  >
    <HeaderSegment
      :scope="scope"
      :link="headerLink"
      :is-change-transparency="isChangeTransparency"
    />

    <slot />
  </div>
</template>

<script>
import HeaderSegment from './BaseHeaderSegmentsContainer/HeaderSegment.vue'
import {
  focusOnSegment
} from '*/helpers/actions/layout'

export default {
  name: 'BaseHeaderSegmentsContainer',
  components: {
    HeaderSegment
  },
  props: {
    isChangeTransparency: {
      type: Boolean,
      default: true
    },
    scope: String,
    headerLink: Object,
    isBasic: Boolean
  },
  methods: {
    focus () {
      focusOnSegment(
        this.$refs.segment
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
