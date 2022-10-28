<template>
  <BaseDropdownContainer
    class="main-source-select"
    :selected="playerSource"
    @select="handleSelect"
  >
    <BaseStreamableSourcesList />
  </BaseDropdownContainer>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseDropdownContainer
  from '@/components/containers/dropdowns/BaseDropdownContainer.vue'
import BaseStreamableSourcesList
  from '@/components/lists/sources/BaseStreamableSourcesList.vue'
import {
  updateGlobal as updateGlobalStore
} from '@/helpers/actions/store'

export default {
  name: 'SourceSelect',
  components: {
    BaseDropdownContainer,
    BaseStreamableSourcesList
  },
  computed: {
    ...mapState(
      'player',
      {
        playerSource: 'source'
      }
    )
  },
  methods: {
    handleSelect (
      value
    ) {
      updateGlobalStore(
        {
          'player.source': value
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped>
::v-deep(.menu)
  max-height: 200px !important
</style>
