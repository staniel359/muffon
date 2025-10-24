<template>
  <BaseOption
    v-for="(optionData, index) in options"
    :key="index"
    :class="{
      disabled:
        optionData.isDisabled,
      'middle-aligned':
        isOptionsMiddleAligned
    }"
    :icon="optionData.icon"
    :text="optionData.text"
    :extra-text="optionData.extraText"
    :is-icon-colored="optionData.isIconColored"
    @click="optionData.onClick"
  />
</template>

<script>
import BaseOption from '../BaseOption.vue'

export default {
  name: 'OptionsMenu',
  components: {
    BaseOption
  },
  props: {
    options: {
      type: Array,
      required: true
    },
    isOptionsMiddleAligned: Boolean
  }
}
</script>

<style lang="sass" scoped></style>
