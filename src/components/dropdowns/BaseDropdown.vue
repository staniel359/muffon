<template>
  <BaseDropdownContainer
    ref="dropdown"
    :options="options"
    :selected="selected"
    :is-selection="isSelection"
    :is-only-icon="isOnlyIcon"
    :menu-direction="menuDirection"
    :header="header"
    :is-colored="isColored"
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
          colored: isColored
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
    isSelection: {
      type: Boolean,
      default: true
    },
    selected: String,
    isOnlyIcon: Boolean,
    menuDirection: String,
    header: String,
    isColored: Boolean,
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
