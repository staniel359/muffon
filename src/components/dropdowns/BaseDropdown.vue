<template>
  <BaseDropdownContainer
    ref="dropdown"
    @change="handleChange"
  >
    <div
      v-for="optionData in optionsFormatted"
      class="item"
      :key="optionData.uuid"
      :data-value="optionData.id"
    >
      {{ optionData.name }}
    </div>
  </BaseDropdownContainer>
</template>

<script>
import BaseDropdownContainer from '@/containers/BaseDropdownContainer.vue'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'BaseDropdown',
  components: {
    BaseDropdownContainer
  },
  props: {
    options: {
      type: Array,
      required: true
    },
    selected: String
  },
  computed: {
    optionsFormatted () {
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
