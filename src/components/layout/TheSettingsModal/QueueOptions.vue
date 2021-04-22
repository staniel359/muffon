<template>
  <div class="main-segment-container main-basic-segment-container">
    <div class="ui basic segment">
      <div class="ui horizontal divider">
        {{ headerFormatted }}
      </div>

      <AutoplayOption />
    </div>
  </div>
</template>

<script>
import AutoplayOption from './QueueOptions/AutoplayOption.vue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'QueueOptions',
  components: {
    AutoplayOption
  },
  computed: {
    headerFormatted () {
      return localize('settings.headers.queue')
    }
  }
}
</script>

<style lang="sass" scoped></style>
