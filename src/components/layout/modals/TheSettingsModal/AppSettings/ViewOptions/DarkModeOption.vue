<template>
  <div class="option">
    <BaseHeader
      class="option-header"
      tag="h4"
      :text="darkModeText"
    />

    <BaseToggle
      :is-checked="isDarkMode"
      @on="handleToggleOn"
      @off="handleToggleOff"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseToggle from '*/components/BaseToggle.vue'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'

export default {
  name: 'DarkModeOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    ),
    darkModeText () {
      return this.$t(
        'settings.options.app.view.darkMode'
      )
    }
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
