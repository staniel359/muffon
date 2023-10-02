<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="countryText"
      />

      <BaseCountrySelectSection
        :country="topCountry"
        @select="handleCountrySelect"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import topStore from '@/stores/top'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseCountrySelectSection
  from '@/components/sections/BaseCountrySelectSection.vue'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'CountryOption',
  components: {
    BaseHeader,
    BaseCountrySelectSection
  },
  computed: {
    ...mapState(
      topStore,
      {
        topCountry: 'country'
      }
    ),
    countryText () {
      return this.$t(
        'settings.options.app.top.country'
      )
    }
  },
  methods: {
    handleCountrySelect (
      value
    ) {
      updateGlobalStore(
        {
          'top.country': value
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
