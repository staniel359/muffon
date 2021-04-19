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

    <AlbumsList :albums="albums" />
  </div>
</template>

<script>
import AlbumsList from './AlbumSelect/AlbumsList.vue'
import { setDropdown } from '#/actions/plugins/semantic'
import { mainDropdownOptions } from '#/data/plugins/semantic'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'AlbumSelect',
  components: {
    AlbumsList
  },
  props: {
    typeId: {
      type: String,
      required: true
    },
    albums: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    headerFormatted () {
      return localize(
        `pages.album.sources.select.${this.typeId}`
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
