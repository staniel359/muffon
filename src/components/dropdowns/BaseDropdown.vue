<template>
  <BaseDropdownContainer
    ref="dropdown"
    :options="options"
    :selected="selected"
    :is-bordered="isBordered"
    :is-only-icon="isOnlyIcon"
    :is-menu-left="isMenuLeft"
    :header="header"
    :is-icon-colored="isIconColored"
    :is-button-extra="isButtonExtra"
    :is-checkboxes="isCheckboxes"
    @select="handleSelect"
  >
    <OptionItem
      v-for="optionData in optionsCollection"
      :key="optionData.uuid"
      :option-data="optionData"
      :is-icon-colored="isIconColored"
      :is-flag-icon="isFlagIcon"
    />
  </BaseDropdownContainer>
</template>

<script>
import BaseDropdownContainer
  from '@/components/containers/dropdowns/BaseDropdownContainer.vue'
import OptionItem from './BaseDropdown/OptionItem.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'

export default {
  name: 'BaseDropdown',
  components: {
    BaseDropdownContainer,
    OptionItem
  },
  props: {
    options: {
      type: Array,
      required: true
    },
    isBordered: {
      type: Boolean,
      default: true
    },
    selected: String,
    isOnlyIcon: Boolean,
    isMenuLeft: Boolean,
    header: String,
    isIconColored: Boolean,
    isFlagIcon: Boolean,
    isButtonExtra: Boolean,
    isCheckboxes: Boolean
  },
  emits: [
    'select'
  ],
  computed: {
    optionsCollection () {
      return formatCollection(
        this.options
      )
    }
  },
  methods: {
    handleSelect (
      value
    ) {
      this.$emit(
        'select',
        value
      )
    },
    reset () {
      this.$refs
        .dropdown
        .reset()
    }
  }
}
</script>

<style lang="sass" scoped></style>
