<template>
  <BaseDropdownContainer
    class="basic floating scrolling button main-source-select"
    ref="dropdown"
  >
    <SourcesList />
  </BaseDropdownContainer>
</template>

<script>
import { mapState } from 'vuex'
import BaseDropdownContainer from '@/containers/BaseDropdownContainer.vue'
import SourcesList from './SourceSelect/SourcesList.vue'

export default {
  name: 'SourceSelect',
  components: {
    BaseDropdownContainer,
    SourcesList
  },
  computed: {
    ...mapState('player', {
      playerSourceId: 'sourceId'
    })
  },
  watch: {
    playerSourceId: {
      immediate: true,
      handler: 'handlePlayerSourceIdChange'
    }
  },
  methods: {
    handlePlayerSourceIdChange (value) {
      this.$nextTick(() => {
        this.$refs.dropdown.setValue(
          value
        )
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.main-source-select
  @extend .no-margin
</style>
