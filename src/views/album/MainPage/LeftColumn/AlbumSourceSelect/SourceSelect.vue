<template>
  <BaseDropdownContainer
    class="basic fluid pointing left scrolling button source-select"
    :header="headerFormatted"
  >
    <SourcesList
      :artistName="artistName"
      :albumTitle="albumTitle"
    />
  </BaseDropdownContainer>
</template>

<script>
import BaseDropdownContainer from '@/containers/BaseDropdownContainer.vue'
import SourcesList from './SourceSelect/SourcesList.vue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'SourceSelect',
  components: {
    BaseDropdownContainer,
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
  }
}
</script>

<style lang="sass" scoped>
.source-select
  margin-bottom: 10px
</style>
