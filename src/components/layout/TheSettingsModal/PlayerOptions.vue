<template>
  <div class="main-settings-options-block">
    <BaseDivider
      :text="headerFormatted"
      isHorizontal
    />

    <SourceOption />
  </div>
</template>

<script>
import BaseDivider from '@/BaseDivider.vue'
import SourceOption from './PlayerOptions/SourceOption.vue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'PlayerOptions',
  components: {
    BaseDivider,
    SourceOption
  },
  computed: {
    headerFormatted () {
      return localize('settings.headers.player')
    }
  }
}
</script>

<style lang="sass" scoped></style>
