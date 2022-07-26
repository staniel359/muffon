<template>
  <BaseDropdownContainer
    class="main-source-select"
    :selected="searchSource"
  >
    <SourcesList />
  </BaseDropdownContainer>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseDropdownContainer
  from '*/components/containers/BaseDropdownContainer.vue'
import SourcesList from './SourceSelect/SourcesList.vue'

export default {
  name: 'SourceSelect',
  components: {
    BaseDropdownContainer,
    SourcesList
  },
  computed: {
    ...mapState(
      'search',
      {
        searchSource: 'source'
      }
    )
  }
}
</script>

<style lang="sass" scoped>
.main-source-select
  @extend .no-margin

::v-deep(.menu)
  max-height: 200px !important
</style>
