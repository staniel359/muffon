<template>
  <div class="ui large labels">
    <CounterLabel
      v-for="(counterData, index) in counters"
      :key="index"
      :counter-data="counterData"
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
