<template>
  <div class="base-country-select-section">
    <BaseCountrySelect
      :key="key"
      class="country-select"
      :selected="country"
      :is-form-field="isFormField"
      @select="handleCountrySelect"
    />

    <BaseClearButton
      v-if="country"
      @click="handleClearButtonClick"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseCountrySelect from '@/components/selects/BaseCountrySelect.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'BaseCountrySelectSection',
  components: {
    BaseCountrySelect,
    BaseClearButton
  },
  props: {
    country: String,
    isFormField: Boolean
  },
  emits: [
    'select'
  ],
  data () {
    return {
      key: null
    }
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileLanguage: 'language'
      }
    )
  },
  watch: {
    profileLanguage:
      'handleProfileLanguageChange',
    country: 'handleCountryChange'
  },
  methods: {
    handleProfileLanguageChange () {
      this.key = generateKey()
    },
    handleCountrySelect (
      value
    ) {
      this.select(
        value
      )
    },
    handleClearButtonClick () {
      this.select(
        null
      )
    },
    handleCountryChange (
      value
    ) {
      if (!value) {
        this.key = generateKey()
      }
    },
    select (
      value
    ) {
      this.$emit(
        'select',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.base-country-select-section
  @extend .d-flex, .align-items-center

.country-select
  width: 220px
</style>
