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

    <TypesList
      :albumsData="albumsData"
      :types="types"
    />
  </div>
</template>

<script>
import TypesList from './TypeSelect/TypesList.vue'
import { setDropdown } from '#/actions/plugins/semantic'
import { mainDropdownOptions } from '#/data/plugins/semantic'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'TypeSelect',
  components: {
    TypesList
  },
  props: {
    albumsData: {
      type: Object,
      required: true
    },
    types: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    headerFormatted () {
      return localize(
        'pages.album.sources.select.type'
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
</style>
