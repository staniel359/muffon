<template>
  <div
    id="the-styles-observer"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import ltrStyle from '@/../semantic/dist/semantic.min.css?inline'
import rtlStyle from '@/../semantic/dist/semantic.rtl.min.css?inline'

export default {
  name: 'TheStylesObserver',
  computed: {
    ...mapState(
      layoutStore,
      [
        'isRtl'
      ]
    ),
    element () {
      return $(
        'style#semantic'
      )[0]
    },
    style () {
      if (this.isRtl) {
        return rtlStyle
      } else {
        return ltrStyle
      }
    }
  },
  watch: {
    isRtl: {
      immediate: true,
      handler: 'handleIsRtlChange'
    }
  },
  methods: {
    handleIsRtlChange () {
      this.element
        .innerHTML = this.style
    }
  }
}
</script>

<style lang="sass" scoped></style>
