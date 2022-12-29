<template>
  <div class="field main-field">
    <BaseCountrySelect
      ref="select"
      :selected="country"
      is-form-field
      @select="handleSelect"
    />

    <BaseClearButton
      v-if="value"
      @click="handleClearButtonClick"
    />
  </div>
</template>

<script>
import BaseCountrySelect from '@/components/selects/BaseCountrySelect.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'

export default {
  name: 'BaseProfileCountryField',
  components: {
    BaseCountrySelect,
    BaseClearButton
  },
  props: {
    country: String
  },
  data () {
    return {
      value: null
    }
  },
  mounted () {
    this.value = this.country
  },
  methods: {
    handleSelect (
      value
    ) {
      this.value = value
    },
    handleClearButtonClick () {
      this.reset()

      this.value = null
    },
    reset () {
      this.$refs
        .select
        .reset()
    }
  }
}
</script>

<style lang="sass" scoped></style>
