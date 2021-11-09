<template>
  <BaseDropdownContainer
    class="selection scrolling main-source-select-type-select"
    icon="dropdown"
    :header="headerFormatted"
  >
    <TypesList
      :albumsData="albumsData"
      :types="types"
    />
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
  props: {
    albumsData: Object,
    types: Array
  },
  computed: {
    headerFormatted () {
      return this.$t(
        'shared.sources.select.type'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
