<template>
  <BaseDropdownContainer
    ref="dropdown"
    class="main-source-select"
    :header="headerFormatted"
  >
    <SourcesList :query="query" />
  </BaseDropdownContainer>
</template>

<script>
import BaseDropdownContainer from '@/containers/BaseDropdownContainer.vue'
import SourcesList from './SourceSelect/SourcesList.vue'

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
      return this.$t(
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
