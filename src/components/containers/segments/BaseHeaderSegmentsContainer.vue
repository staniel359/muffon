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
