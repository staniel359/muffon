<template>
  <BaseDropdownContainer
    class="basic pointing scrolling button main-source-select"
    ref="dropdown"
    :header="headerFormatted"
  >
    <SourcesList :query="query" />
  </BaseDropdownContainer>
</template>

<script>
import BaseDropdownContainer from '@/containers/BaseDropdownContainer.vue'
import SourcesList from './SourceSelect/SourcesList.vue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'SourceSelect',
  components: {
    BaseDropdownContainer,
    SourcesList
  },
  props: {
    query: String
  },
  computed: {
    headerFormatted () {
      return localize(
        'shared.sources.select.source'
      )
    }
  },
  methods: {
    reset () {
      this.$refs.dropdown.reset()
    }
  }
}
</script>

<style lang="sass" scoped></style>
