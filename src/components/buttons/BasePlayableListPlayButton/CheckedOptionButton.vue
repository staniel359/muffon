<template>
  <BaseButton
    class="active"
    :icon="icon"
    :is-invertable="false"
  />
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'

export default {
  name: 'CheckedOptionButton',
  components: {
    BaseButton
  },
  props: {
    option: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    }
  },
  computed: {
    icon () {
      return this.matchedOptionData.icon
    },
    matchedOptionData () {
      return this.options.find(
        this.isMatchedOption
      )
    }
  },
  methods: {
    isMatchedOption (
      optionData
    ) {
      return (
        optionData.id === this.option
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
