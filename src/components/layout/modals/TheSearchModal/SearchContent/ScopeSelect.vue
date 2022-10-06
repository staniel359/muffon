<template>
  <BaseScopesDropdown
    class="scope-select-container"
    :selected="scope"
    :scopes="scopes"
    @select="handleSelect"
  />
</template>

<script>
import BaseScopesDropdown from '@/components/dropdowns/BaseScopesDropdown.vue'
import audioSources from '@/helpers/data/audio/sources'

export default {
  name: 'ScopeSelect',
  components: {
    BaseScopesDropdown
  },
  props: {
    scope: {
      type: String,
      required: true
    },
    source: {
      type: String,
      required: true
    }
  },
  emits: [
    'select'
  ],
  data () {
    return {
      scopes: [
        'artists',
        'albums',
        'albumGroups',
        'tracks',
        'tags',
        'videos'
      ]
    }
  },
  computed: {
    firstScope () {
      return this.sourceScopes[0]
    },
    sourceScopes () {
      return this.sourceData.searchScopes
    },
    sourceData () {
      return audioSources.find(
        this.isMatchedSource
      )
    },
    isSourceHasScope () {
      return this.sourceScopes.includes(
        this.scope
      )
    }
  },
  watch: {
    source: {
      immediate: true,
      handler: 'handleSourceChange'
    }
  },
  methods: {
    handleSourceChange () {
      if (!this.isSourceHasScope) {
        this.select(
          this.firstScope
        )
      }
    },
    handleSelect (
      value
    ) {
      this.select(
        value
      )
    },
    select (
      value
    ) {
      this.$emit(
        'select',
        value
      )
    },
    isMatchedSource (
      sourceData
    ) {
      return (
        sourceData.id ===
          this.source
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.scope-select-container
  margin-left: 1em !important
</style>
