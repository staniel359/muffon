<template>
  <BaseDropdownContainer
    ref="dropdown"
    :is-selection="isSelection"
    :is-only-icon="isOnlyIcon"
    :menu-direction="menuDirection"
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
        class="colored main-dropdown-icon"
        :icon="optionData.icon"
      />

      {{ optionData.name }}
    </div>
  </BaseDropdownContainer>
</template>

<script>
import BaseDropdownContainer
  from '*/components/containers/BaseDropdownContainer.vue'
import BaseIcon from '*/components/BaseIcon.vue'
import {
  collection as formatCollection
} from '*/helpers/formatters'

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
    menuDirection: String
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
  mounted () {
    if (this.selected) {
      this.$refs
        .dropdown
        .setValue(
          this.selected
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
