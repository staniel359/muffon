<template>
  <BaseDropdownContainer
    class="basic floating scrolling button source-select"
    ref="dropdown"
  >
    <SourcesList />
  </BaseDropdownContainer>
</template>

<script>
import BaseDropdownContainer from '@/containers/BaseDropdownContainer.vue'
import SourcesList from './SourceSelect/SourcesList.vue'
import { getPlayerSourceId } from '#/actions/settings'

export default {
  name: 'SourceSelect',
  components: {
    BaseDropdownContainer,
    SourcesList
  },
  mounted () {
    this.$refs.dropdown.setValue(
      getPlayerSourceId()
    )
  }
}
</script>

<style lang="sass" scoped>
.source-select
  width: 220px
</style>
