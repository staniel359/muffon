<template>
  <BaseDropdownContainer
    ref="dropdown"
    class="main-source-select source-select"
    :header="headerText"
  >
    <SourcesList
      :query="query"
    />
  </BaseDropdownContainer>
</template>

<script>
import BaseDropdownContainer
  from '@/components/containers/BaseDropdownContainer.vue'
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
    headerText () {
      return this.$t(
        'select.source'
      )
    }
  },
  methods: {
    reset () {
      this.$refs
        .dropdown
        .reset()
    }
  }
}
</script>

<style lang="sass" scoped>
.source-select
  width: 175px
</style>
