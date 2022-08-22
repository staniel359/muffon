<template>
  <BaseDropdownContainer
    class="main-source-select"
    :selected="playerSource"
  >
    <BasePlayerSourcesList
      @select="handleSelect"
    />
  </BaseDropdownContainer>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseDropdownContainer
  from '*/components/containers/BaseDropdownContainer.vue'
import BasePlayerSourcesList
  from '*/components/lists/player/BasePlayerSourcesList.vue'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'

export default {
  name: 'SourceSelect',
  components: {
    BaseDropdownContainer,
    BasePlayerSourcesList
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
