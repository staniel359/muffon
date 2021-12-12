<template>
  <div
    class="ui statistics"
    :class="{ inverted: isDarkMode }"
  >
    <BaseLinkContainer
      v-for="statisticData in statisticsCollection"
      class="statistic"
      :key="statisticData.key"
      :link="statisticData.link"
    >
      <div class="value link">
        {{ statisticData.value }}
      </div>

      <div class="label link">
        {{ statisticData.text }}
      </div>
    </BaseLinkContainer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseLinkContainer from '@/containers/links/BaseLinkContainer.vue'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'BaseStatistics',
  components: {
    BaseLinkContainer
  },
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
  }
}
</script>

<style lang="sass" scoped></style>
