<template>
  <BaseDropdownContainer
    class="main-source-select-type-select"
    :header="headerText"
    @select="handleSelect"
  >
    <TypeItem
      v-for="(type, index) in types"
      :key="index"
      :type-id="type"
      :videos-data="videosData"
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
    'setSelectedTypeId'
  ],
  props: {
    types: {
      type: Array,
      default () {
        return []
      }
    },
    videosData: Object
  },
  computed: {
    headerText () {
      return this.$t(
        'select.type'
      )
    }
  },
  methods: {
    handleSelect (
      value
    ) {
      this.setSelectedTypeId(
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
