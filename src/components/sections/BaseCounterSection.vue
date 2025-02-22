<template>
  <div class="main-counter-section">
    <span
      @click="handleClick"
      v-html="countText"
    />
  </div>
</template>

<script>
import {
  number as formatNumber
} from '@/helpers/formatters'

export default {
  name: 'BaseCounterSection',
  props: {
    count: {
      type: Number,
      required: true
    },
    scope: {
      type: String,
      required: true
    }
  },
  emits: [
    'click'
  ],
  computed: {
    countText () {
      return this.$t(
        `counters.nominative.${this.scope}`,
        this.count,
        {
          named: {
            count: this.countStrong
          }
        }
      )
    },
    countStrong () {
      return `<strong>${this.countFormatted}</strong>`
    },
    countFormatted () {
      return formatNumber(
        this.count
      )
    }
  },
  methods: {
    handleClick () {
      this.$emit(
        'click'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
