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
    @select="handleSelect"
  >
    <div
      v-for="optionData in optionsCollection"
      :key="optionData.uuid"
      class="item main-dropdown-item"
      :data-value="optionData.id"
    >
      <BaseIcon
        v-if="optionData.icon"
        class="main-dropdown-icon"
        :class="{
          colored: isIconColored
        }"
        :icon="optionData.icon"
        :is-flag="isFlagIcon"
      />

      {{ optionData.name }}
    </div>
  </BaseDropdownContainer>
</template>

<script>
import BaseDropdownContainer
  from '@/components/containers/dropdowns/BaseDropdownContainer.vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'

export default {
  name: 'BaseDropdown',
  components: {
    BaseDropdownContainer,
    BaseIcon
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
    isFlagIcon: Boolean
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
