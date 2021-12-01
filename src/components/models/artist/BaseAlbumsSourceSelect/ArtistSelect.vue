<template>
  <BaseDropdownContainer
    class="main-source-select-item-select"
    :header="headerFormatted"
  >
    <ArtistsList :artists="artists" />
  </BaseDropdownContainer>
</template>

<script>
import BaseDropdownContainer from '@/containers/BaseDropdownContainer.vue'
import ArtistsList from './ArtistSelect/ArtistsList.vue'

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
      return this.$t(
        'shared.sources.select.artist'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
