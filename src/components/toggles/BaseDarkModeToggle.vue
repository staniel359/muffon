<template>
  <BaseToggle
    :is-checked="isDarkMode"
    @on="handleToggleOn"
    @off="handleToggleOff"
  />
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseToggle from '*/components/BaseToggle.vue'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'

export default {
  name: 'BaseDarkModeToggle',
  components: {
    BaseToggle
  },
  computed: {
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    )
  },
  methods: {
    handleToggleOn () {
      updateGlobalStore(
        {
          'layout.isDarkMode': true
        }
      )
    },
    handleToggleOff () {
      updateGlobalStore(
        {
          'layout.isDarkMode': false
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
