<template>
  <BaseDropdownContainer
    class="basic pointing scrolling button main-source-select-item-select"
    :header="headerFormatted"
  >
    <ArtistsList :artists="artists" />
  </BaseDropdownContainer>
</template>

<script>
import BaseDropdownContainer from '@/containers/BaseDropdownContainer.vue'
import ArtistsList from './ArtistSelect/ArtistsList.vue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'ArtistSelect',
  components: {
    BaseDropdownContainer,
    ArtistsList
  },
  props: {
    artists: Array
  },
  computed: {
    headerFormatted () {
      return localize(
        'shared.sources.select.artist'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
