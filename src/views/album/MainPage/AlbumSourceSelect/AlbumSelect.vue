<template>
  <BaseDropdownContainer
    class="basic pointing scrolling button album-select"
    :header="headerFormatted"
  >
    <AlbumsList :albums="albums" />
  </BaseDropdownContainer>
</template>

<script>
import BaseDropdownContainer from '@/containers/BaseDropdownContainer.vue'
import AlbumsList from './AlbumSelect/AlbumsList.vue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'AlbumSelect',
  components: {
    BaseDropdownContainer,
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
  }
}
</script>

<style lang="sass" scoped>
.album-select
  width: 210px
  margin-right: 1em
</style>
