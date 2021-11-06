<template>
  <div class="scope-select-container">
    <select
      class="ui compact selection dropdown"
      ref="dropdown"
    >
      <option
        v-for="sourceData in sourcesFormatted"
        :key="sourceData.uuid"
        :value="sourceData.id"
      >
        {{ sourceData.name }}
      </option>
    </select>
  </div>
</template>

<script>
import { setDropdown, setDropdownValue } from '#/actions/plugins/semantic'
import { mainDropdownOptions } from '#/data/plugins/semantic'
import { collection as formatCollection } from '#/formatters'
import audioSources from '#/data/audio/sources'

export default {
  name: 'SearchSourceSelect',
  emits: [
    'select'
  ],
  computed: {
    dropdownOptions () {
      return mainDropdownOptions({
        onChange: this.handleChange
      })
    },
    sourcesFormatted () {
      return formatCollection(
        audioSources
      )
    }
  },
  mounted () {
    setDropdown(
      this.$refs.dropdown,
      this.dropdownOptions
    )

    this.$nextTick(() => {
      setDropdownValue(
        this.$refs.dropdown,
        'lastfm'
      )
    })
  },
  methods: {
    handleChange (value) {
      this.$emit(
        'select',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.scope-select-container
  margin-left: 1em !important
  ::v-deep(.dropdown)
    width: 150px
</style>
