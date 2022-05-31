<template>
  <BaseDropdownContainer
    class="main-source-select-item-select"
    :header="headerText"
  >
    <ArtistsList
      :artists="artists"
    />
  </BaseDropdownContainer>
</template>

<script>
import BaseDropdownContainer
  from '*/components/containers/BaseDropdownContainer.vue'
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
    headerText () {
      return this.$t(
        'select.artist'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
