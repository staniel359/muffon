<template>
  <BaseOption
    icon="search"
    :text="sourceText"
    :options="options"
    is-options-middle-aligned
  />
</template>

<script>
import BaseOption from '@/components/popups/options/BaseOption.vue'
import {
  audio as audioSources
} from '@/helpers/formatters/sources'

export default {
  name: 'SourceOption',
  components: {
    BaseOption
  },
  emits: [
    'click'
  ],
  computed: {
    sourceText () {
      return this.$t(
        'actions.searchIn.source'
      )
    },
    options () {
      return this.sources.map(
        this.formatSource
      )
    },
    sources () {
      return audioSources
    }
  },
  methods: {
    formatSource (
      sourceData
    ) {
      const handleClick = () => {
        this.$emit(
          'click',
          sourceData.id
        )
      }

      return {
        icon: sourceData.icon,
        isIconColored: true,
        text: sourceData.name,
        onClick: handleClick
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
