<template>
  <div
    class="ui statistics"
    :class="{
      inverted: isDarkMode
    }"
  >
    <div
      v-for="statisticData in statisticsCollection"
      :key="statisticData.key"
      class="statistic"
    >
      <div
        class="value link"
        v-text="formatNumber(statisticData.value)"
      />

      <div
        class="label link"
        v-text="statisticData.text"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import {
  collection as formatCollection,
  number as formatNumber
} from '@/helpers/formatters'

export default {
  name: 'BaseStatistics',
  props: {
    statistics: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    ),
    statisticsCollection () {
      return formatCollection(
        this.statistics
      )
    }
  },
  methods: {
    formatNumber
  }
}
</script>

<style lang="sass" scoped></style>
