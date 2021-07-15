<template>
  <BaseDropdownContainer
    class="basic pointing scrolling button main-source-select-type-select"
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
import { localize } from '#/actions/plugins/i18n'

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
      return localize(
        'shared.sources.select.type'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
