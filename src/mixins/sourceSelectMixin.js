import {
  generateKey
} from '@/helpers/utils'

export default {
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
      key: null
    }
  },
  computed: {
    isSourceHasScope () {
      return this.sourceScopes.includes(
        this.scope
      )
    },
    sourceScopes () {
      return (
        this.sourceData?.searchScopes || []
      )
    },
    sourceData () {
      return this.sources.find(
        this.isMatchedSource
      )
    }
  },
  methods: {
    handleScopeChange () {
      this.key = generateKey()

      if (!this.isSourceHasScope) {
        this.select(
          this.firstSource
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
