<template>
  <div class="main-settings-options-block">
    <BaseDivider
      :text="headerFormatted"
      isHorizontal
    />

    <DarkModeOption />
  </div>
</template>

<script>
import BaseDivider from '@/BaseDivider.vue'
import DarkModeOption from './ViewOptions/DarkModeOption.vue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'ViewOptions',
  components: {
    BaseDivider,
    DarkModeOption
  },
  computed: {
    headerFormatted () {
      return localize(
        'layout.settings.headers.app.view'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
