<template>
  <BaseDropdownContainer
    ref="dropdown"
    class="main-source-select"
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
      'player',
      {
        playerSourceId: 'sourceId'
      }
    )
  },
  watch: {
    playerSourceId: {
      immediate: true,
      handler: 'handlePlayerSourceIdChange'
    }
  },
  methods: {
    async handlePlayerSourceIdChange (
      value
    ) {
      await this.$nextTick()

      this.$refs
        .dropdown
        .setValue(
          value
        )
    }
  }
}
</script>

<style lang="sass" scoped>
.main-source-select
  @extend .no-margin

::v-deep(.menu)
  max-height: 200px !important
</style>
