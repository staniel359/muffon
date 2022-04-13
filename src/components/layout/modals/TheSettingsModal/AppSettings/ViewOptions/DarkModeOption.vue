<template>
  <div class="content">
    <BaseHeader
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
  updateStore
} from '*/helpers/actions'

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
      updateStore(
        {
          'layout.isDarkMode': true
        }
      )
    },
    handleToggleOff () {
      updateStore(
        {
          'layout.isDarkMode': false
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
