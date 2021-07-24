<template>
  <div class="content">
    <BaseHeader
      tag="h4"
      :text="headerFormatted"
    />

    <SourceSelect />
  </div>
</template>

<script>
import BaseHeader from '@/BaseHeader.vue'
import SourceSelect from './SourceOption/SourceSelect.vue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'SourceOption',
  components: {
    BaseHeader,
    SourceSelect
  },
  computed: {
    headerFormatted () {
      return localize(
        'layout.settings.options.player.audioSource'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
