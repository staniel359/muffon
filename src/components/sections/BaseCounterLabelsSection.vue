<template>
  <div class="ui labels">
    <BaseCounterLabel
      v-for="(counterData, index) in counters"
      :key="index"
      :counter-data="counterData"
      :size="size"
    />
  </div>
</template>

<script>
import BaseCounterLabel from '@/components/labels/BaseCounterLabel.vue'

export default {
  name: 'BaseCounterLabelsSection',
  components: {
    BaseCounterLabel
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
