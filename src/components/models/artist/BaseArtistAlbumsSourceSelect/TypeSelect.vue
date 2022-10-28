<template>
  <BaseDropdownContainer
    class="main-source-select-type-select"
    :selected="selected"
    @select="handleSelect"
  >
    <TypeItem
      v-for="(type, index) in types"
      :key="index"
      :type-id="type"
    />
  </BaseDropdownContainer>
</template>

<script>
import BaseDropdownContainer
  from '@/components/containers/dropdowns/BaseDropdownContainer.vue'
import TypeItem from './TypeSelect/TypeItem.vue'

export default {
  name: 'TypeSelect',
  components: {
    BaseDropdownContainer,
    TypeItem
  },
  inject: [
    'setSelectedTypeData'
  ],
  props: {
    types: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    selected () {
      return this.types[0]
    }
  },
  mounted () {
    this.setSelectedTypeData(
      {
        id: 'album'
      }
    )
  },
  methods: {
    handleSelect (
      value
    ) {
      this.setSelectedTypeData(
        {
          id: value
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
