<template>
  <BaseDropdownContainer
    class="main-source-select-type-select"
    selected="0"
  >
    <TypesList
      :types="types"
    />
  </BaseDropdownContainer>
</template>

<script>
import BaseDropdownContainer
  from '*/components/containers/BaseDropdownContainer.vue'
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
    this.setSelectedTypeId(
      'album'
    )
  }
}
</script>

<style lang="sass" scoped></style>
