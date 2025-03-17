<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
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
import BaseSettingsOptionHeader
  from '@/components/headers/settings/BaseSettingsOptionHeader.vue'
import BaseCountrySelectSection
  from '@/components/sections/BaseCountrySelectSection.vue'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'CountryOption',
  components: {
    BaseSettingsOptionHeader,
    BaseCountrySelectSection
  },
  computed: {
    ...mapState(
      topStore,
      {
        topCountry: 'country'
      }
    ),
    optionText () {
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
