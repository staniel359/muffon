<template>
  <div
    v-if="isRender"
  >
    <div class="ui labels">
      <BaseCounterLabel
        v-for="(counterData, index) in counters"
        :key="index"
        :counter-data="counterData"
        :size="size"
      />
    </div>
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
  },
  computed: {
    isRender () {
      return this.counters.map(
        this.formatCounterData
      ).some(
        count => count
      )
    }
  },
  methods: {
    formatCounterData (
      counterData
    ) {
      return counterData.count
    }
  }
}
</script>

<style lang="sass" scoped></style>
