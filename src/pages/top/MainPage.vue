<template>
  <BaseTopPageContainer
    :key="refreshKey"
    :is-get-data="false"
  >
    <BaseSegmentsContainer
      class="main-page-segment-container"
    >
      <TopSegment
        :country="country"
        @country-select="handleCountrySelect"
      />

      <TabsSegment
        :key="key"
        :country="country"
      />
    </BaseSegmentsContainer>
  </BaseTopPageContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import topStore from '@/stores/top'
import BaseTopPageContainer
  from '@/components/containers/pages/top/BaseTopPageContainer.vue'
import BaseSegmentsContainer
  from '@/components/containers/segments/BaseSegmentsContainer.vue'
import TopSegment from './MainPage/TopSegment.vue'
import TabsSegment from './MainPage/TabsSegment.vue'
import {
  generateKey
} from '@/helpers/utils'
import pageMixin from '@/mixins/pageMixin'

export default {
  name: 'MainPage',
  components: {
    BaseTopPageContainer,
    BaseSegmentsContainer,
    TopSegment,
    TabsSegment
  },
  mixins: [
    pageMixin
  ],
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
