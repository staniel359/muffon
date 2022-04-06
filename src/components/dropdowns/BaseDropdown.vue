<template>
  <BaseDropdownContainer
    ref="dropdown"
    :isSelection="isSelection"
    :isOnlyIcon="isOnlyIcon"
    :menuDirection="menuDirection"
    @change="handleChange"
  >
    <div
      v-for="optionData in optionsCollection"
      class="item main-dropdown-item"
      :key="optionData.uuid"
      :data-value="optionData.id"
    >
      <BaseIcon
        v-if="optionData.icon"
        class="main-dropdown-icon colored"
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
import { collection as formatCollection } from '*/helpers/formatters'

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
  computed: {
    optionsCollection () {
      return formatCollection(
        this.options
      )
    }
  },
  mounted () {
    if (this.selected) {
      this.$refs.dropdown.setValue(
        this.selected
      )
    }
  },
  methods: {
    handleChange (value) {
      this.$emit(
        'change',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
