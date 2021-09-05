<template>
  <div class="main-settings-options-block">
    <BaseDivider
      :text="headerFormatted"
      isHorizontal
    />

    <AutoplayOption />
  </div>
</template>

<script>
import BaseDivider from '@/BaseDivider.vue'
import AutoplayOption from './QueueOptions/AutoplayOption.vue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'QueueOptions',
  components: {
    BaseDivider,
    AutoplayOption
  },
  computed: {
    headerFormatted () {
      return localize(
        'layout.settings.sections.app.queue'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
