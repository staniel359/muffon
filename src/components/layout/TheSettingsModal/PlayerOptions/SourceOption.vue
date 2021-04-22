<template>
  <div class="source-option">
    <h4 class="ui header main-header">
      {{ textFormatted }}
    </h4>

    <SourceSelect />
  </div>
</template>

<script>
import SourceSelect from './SourceOption/SourceSelect.vue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'SourceOption',
  components: {
    SourceSelect
  },
  computed: {
    textFormatted () {
      return localize(
        'settings.player.audioSource'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.source-option
  @extend .d-flex, .align-items-center

.main-header
  @extend .flex-full
</style>
