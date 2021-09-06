<template>
  <div class="scope-select-container">
    <select
      class="ui compact selection dropdown"
      ref="dropdown"
    >
      <option value="artists">
        {{ artistsFormatted }}
      </option>
      <option value="albums">
        {{ albumsFormatted }}
      </option>
      <option value="tracks">
        {{ tracksFormatted }}
      </option>
    </select>
  </div>
</template>

<script>
import { setDropdown } from '#/actions/plugins/semantic'
import { mainDropdownOptions } from '#/data/plugins/semantic'

export default {
  name: 'SearchScopeSelect',
  emits: [
    'select'
  ],
  computed: {
    dropdownOptions () {
      return mainDropdownOptions({
        onChange: this.handleChange
      })
    },
    artistsFormatted () {
      return this.$t(
        'layout.navigation.artists'
      )
    },
    albumsFormatted () {
      return this.$t(
        'layout.navigation.albums'
      )
    },
    tracksFormatted () {
      return this.$t(
        'layout.navigation.tracks'
      )
    }
  },
  mounted () {
    setDropdown(
      this.$refs.dropdown,
      this.dropdownOptions
    )

    this.handleChange(
      'artists'
    )
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
</style>
