<template>
  <div class="ui labels">
    <CounterLabel
      v-for="(counterData, index) in counters"
      :key="index"
      :counter-data="counterData"
      :size="size"
    />
  </div>
</template>

<script>
import CounterLabel from './BaseCounterLabels/CounterLabel.vue'

export default {
  name: 'BaseCounterLabels',
  components: {
    CounterLabel
  },
  props: {
    counters: {
      type: Array,
      default () {
        return []
      }
    },
    size: String
  }
}
</script>

<style lang="sass" scoped></style>
