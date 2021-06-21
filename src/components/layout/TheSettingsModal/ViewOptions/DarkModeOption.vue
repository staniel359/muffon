<template>
  <div class="content">
    <BaseHeader
      tag="h4"
      :text="headerFormatted"
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
import { localize } from '#/actions/plugins/i18n'
import { setGlobalData } from '#/actions'

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
    headerFormatted () {
      return localize(
        'settings.view.darkMode'
      )
    }
  },
  methods: {
    handleToggleOn () {
      setGlobalData({
        'layout.isDarkMode': true
      })
    },
    handleToggleOff () {
      setGlobalData({
        'layout.isDarkMode': false
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
