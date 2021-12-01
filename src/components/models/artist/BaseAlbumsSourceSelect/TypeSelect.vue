<template>
  <BaseDropdownContainer
    ref="dropdown"
    class="main-source-select-type-select"
  >
    <TypesList :types="types" />
  </BaseDropdownContainer>
</template>

<script>
import BaseDropdownContainer from '@/containers/BaseDropdownContainer.vue'
import TypesList from './TypeSelect/TypesList.vue'

export default {
  name: 'TypeSelect',
  components: {
    BaseDropdownContainer,
    TypesList
  },
  inject: [
    'setSelectedTypeId'
  ],
  props: {
    types: Array
  },
  mounted () {
    this.setSelectedTypeId('album')

    this.$refs.dropdown.setValue(0)
  }
}
</script>

<style lang="sass" scoped></style>
