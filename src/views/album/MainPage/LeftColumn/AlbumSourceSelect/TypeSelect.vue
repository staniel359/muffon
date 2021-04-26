<template>
  <BaseDropdownContainer
    class="basic fluid pointing left scrolling button"
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
    albumsData: {
      type: Object,
      required: true
    },
    types: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    headerFormatted () {
      return localize(
        'pages.album.sources.select.type'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.main-dropdown
  margin-bottom: 10px
</style>
