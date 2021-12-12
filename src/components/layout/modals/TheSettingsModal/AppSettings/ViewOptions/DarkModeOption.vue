<template>
  <div class="content">
    <BaseHeader
      tag="h4"
      :text="darkModeText"
    />

    <BaseToggle
      :isChecked="isDarkMode"
      @on="handleToggleOn"
      @off="handleToggleOff"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseHeader from '@/BaseHeader.vue'
import BaseToggle from '@/BaseToggle.vue'
import { updateStore } from '#/actions'

export default {
  name: 'DarkModeOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ]),
    darkModeText () {
      return this.$t(
        'layout.settings.options.app.view.darkMode'
      )
    }
  },
  methods: {
    handleToggleOn () {
      updateStore({
        'layout.isDarkMode': true
      })
    },
    handleToggleOff () {
      updateStore({
        'layout.isDarkMode': false
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
