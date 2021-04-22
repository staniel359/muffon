<template>
  <div class="main-segment-container main-basic-segment-container">
    <div class="ui basic segment">
      <div class="ui horizontal divider">
        {{ headerFormatted }}
      </div>

      <SourceOption />
    </div>
  </div>
</template>

<script>
import SourceOption from './PlayerOptions/SourceOption.vue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'PlayerOptions',
  components: {
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
