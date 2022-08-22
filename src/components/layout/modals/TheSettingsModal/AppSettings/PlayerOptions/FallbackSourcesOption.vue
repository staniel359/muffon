<template>
  <div class="option">
    <BaseHeader
      class="option-header"
      tag="h4"
      :text="fallbackSourcesText"
    />

    <div class="sources-list-container">
      <SourcesList />

      <AddButton />
    </div>
  </div>
</template>

<script>
import BaseHeader from '*/components/BaseHeader.vue'
import SourcesList from './FallbackSourcesOption/SourcesList.vue'
import AddButton from './FallbackSourcesOption/AddButton.vue'

export default {
  name: 'FallbackSourcesOption',
  components: {
    BaseHeader,
    SourcesList,
    AddButton
  },
  computed: {
    fallbackSourcesText () {
      return this.$t(
        'settings.options.app.player.fallbackSources'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.sources-list-container
  @extend .d-flex, .flex-column
</style>
