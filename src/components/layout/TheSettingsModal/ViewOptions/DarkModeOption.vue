<template>
  <div class="content">
    <BaseHeader
      tag="h4"
      :text="headerFormatted"
    />

    <BaseToggle
      :isChecked="isChecked"
      @on="handleToggleOn"
      @off="handleToggleOff"
    />
  </div>
</template>

<script>
import BaseHeader from '@/BaseHeader.vue'
import BaseToggle from '@/BaseToggle.vue'
import { getIsDarkMode as getIsLocalDarkMode } from '#/actions/plugins/local'
import { setIsDarkMode } from '#/actions/layout'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'DarkModeOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    headerFormatted () {
      return localize(
        'settings.view.darkMode'
      )
    },
    isChecked () {
      return getIsLocalDarkMode()
    }
  },
  methods: {
    handleToggleOn () {
      setIsDarkMode(true)
    },
    handleToggleOff () {
      setIsDarkMode(false)
    }
  }
}
</script>

<style lang="sass" scoped></style>
