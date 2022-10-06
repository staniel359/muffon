<template>
  <span
    class="main-link"
    @click="handleClick"
    v-html="listenersFormatted"
  />
</template>

<script>
import {
  number as formatNumber
} from '@/helpers/formatters'

export default {
  name: 'BaseListenersCountSection',
  props: {
    listenersCount: {
      type: Number,
      required: true
    }
  },
  emits: [
    'click'
  ],
  computed: {
    listenersFormatted () {
      return this.$tc(
        'listeners',
        this.listenersCount,
        {
          count: this.listenersCountStrong
        }
      )
    },
    listenersCountStrong () {
      return `<strong>${this.listenersCountFormatted}</strong>`
    },
    listenersCountFormatted () {
      return formatNumber(
        this.listenersCount
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
