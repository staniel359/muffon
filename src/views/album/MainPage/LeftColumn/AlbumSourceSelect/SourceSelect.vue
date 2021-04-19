<template>
  <div
    class="ui basic button fluid pointing left scrolling dropdown main-dropdown"
    ref="dropdown"
  >
    <div class="text main-dropdown-item">
      <div class="content">
        <div class="header">
          {{ headerFormatted }}
        </div>
      </div>
    </div>

    <SourcesList
      :artistName="artistName"
      :albumTitle="albumTitle"
    />
  </div>
</template>

<script>
import SourcesList from './SourceSelect/SourcesList.vue'
import { setDropdown } from '#/actions/plugins/semantic'
import { mainDropdownOptions } from '#/data/plugins/semantic'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'SourceSelect',
  components: {
    SourcesList
  },
  props: {
    artistName: String,
    albumTitle: String
  },
  computed: {
    headerFormatted () {
      return localize(
        'pages.album.sources.select.source'
      )
    }
  },
  mounted () {
    setDropdown(
      this.$refs.dropdown,
      mainDropdownOptions()
    )
  }
}
</script>

<style lang="sass" scoped>
.main-dropdown
  margin-bottom: 10px

.ui.scrolling.dropdown .menu
  width: $albumSourceSelectMenuWidth !important
</style>
