<template>
  <BaseTopPageContainer
    :is-get-data="false"
  >
    <TopSegment
      :country="country"
      @country-select="handleCountrySelect"
    />

    <TabsSegment
      :key="key"
      :country="country"
    />
  </BaseTopPageContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import topStore from '@/stores/top'
import BaseTopPageContainer
  from '@/components/containers/pages/top/BaseTopPageContainer.vue'
import TopSegment from './MainPage/TopSegment.vue'
import TabsSegment from './MainPage/TabsSegment.vue'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'MainPage',
  components: {
    BaseTopPageContainer,
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
