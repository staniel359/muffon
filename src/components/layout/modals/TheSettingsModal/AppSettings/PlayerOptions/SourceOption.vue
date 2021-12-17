<template>
  <div class="content">
    <BaseHeader
      tag="h4"
      :text="sourceText"
    />

    <SourceSelect />
  </div>
</template>

<script>
import BaseHeader from '@/BaseHeader.vue'
import SourceSelect from './SourceOption/SourceSelect.vue'

export default {
  name: 'SourceOption',
  components: {
    BaseHeader,
    SourceSelect
  },
  computed: {
    sourceText () {
      return this.$t(
        'settings.options.app.player.audioSource'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
