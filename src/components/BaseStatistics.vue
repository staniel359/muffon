<template>
  <div
    class="ui statistics"
    :class="{ inverted: isDarkMode }"
  >
    <div
      v-for="statisticData in statisticsCollection"
      class="statistic"
      :key="statisticData.key"
    >
      <div class="value link">
        {{ formatNumber(statisticData.value) }}
      </div>

      <div class="label link">
        {{ statisticData.text }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  collection as formatCollection,
  number as formatNumber
} from '*/helpers/formatters'

export default {
  name: 'BaseStatistics',
  props: {
    statistics: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ]),
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
