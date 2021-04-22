<template>
  <div
    class="ui basic floating scrolling button dropdown main-dropdown"
    ref="dropdown"
  >
    <div class="text main-dropdown-item"></div>

    <SourcesList />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SourcesList from './SourceSelect/SourcesList.vue'
import { mainDropdownOptions } from '#/data/plugins/semantic'
import { setDropdown, selectDropdownValue } from '#/actions/plugins/semantic'

export default {
  name: 'SourceSelect',
  components: {
    SourcesList
  },
  computed: {
    ...mapState('player', {
      playerSourceId: 'sourceId'
    })
  },
  mounted () {
    this.$nextTick(() => {
      setDropdown(
        this.$refs.dropdown,
        mainDropdownOptions()
      )

      selectDropdownValue(
        this.$refs.dropdown,
        this.playerSourceId
      )
    })
  }
}
</script>

<style lang="sass" scoped>
.main-dropdown
  width: 220px
</style>
