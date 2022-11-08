<template>
  <div class="menu">
    <BaseOption
      v-for="(optionData, index) in options"
      :key="index"
      :class="{
        disabled: optionData.isDisabled
      }"
      :icon="optionData.icon"
      :text="optionData.text"
      @click="optionData.onClick"
    />
  </div>
</template>

<script>
import BaseOption from '@/components/dropdowns/options/BaseOption.vue'

export default {
  name: 'OptionsMenu',
  components: {
    BaseOption
  },
  props: {
    options: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped></style>
