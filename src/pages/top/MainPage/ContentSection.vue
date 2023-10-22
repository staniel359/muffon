<template>
  <TopSegment
    :country="country"
    @country-select="handleCountrySelect"
  />

  <TabsSegment
    :key="key"
    :country="country"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import topStore from '@/stores/top'
import TopSegment from './ContentSection/TopSegment.vue'
import TabsSegment from './ContentSection/TabsSegment.vue'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'ContentSection',
  components: {
    TopSegment,
    TabsSegment
  },
  data () {
    return {
      key: null,
      country: null
    }
  },
  computed: {
    ...mapState(
      topStore,
      {
        topCountry: 'country'
      }
    )
  },
  watch: {
    topCountry: {
      immediate: true,
      handler: 'handleTopCountryChange'
    }
  },
  methods: {
    handleTopCountryChange (
      value
    ) {
      this.changeCountry(
        value
      )
    },
    handleCountrySelect (
      value
    ) {
      this.changeCountry(
        value
      )
    },
    changeCountry (
      value
    ) {
      this.country = value

      this.key = generateKey()
    }
  }
}
</script>

<style lang="sass" scoped></style>
