<template>
  <BaseDropdownContainer
    :header="headerText"
    @select="handleSelect"
  >
    <ArtistItem
      v-for="artistData in artistsCollection"
      :key="artistData.uuid"
      :artist-data="artistData"
    />
  </BaseDropdownContainer>
</template>

<script>
import BaseDropdownContainer
  from '@/components/containers/dropdowns/BaseDropdownContainer.vue'
import ArtistItem from './ArtistSelect/ArtistItem.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'

export default {
  name: 'ArtistSelect',
  components: {
    BaseDropdownContainer,
    ArtistItem
  },
  inject: [
    'setSelectedArtistData'
  ],
  props: {
    artists: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    headerText () {
      return this.$t(
        'select.artist'
      )
    },
    artistsCollection () {
      return formatCollection(
        this.artists
      )
    }
  },
  methods: {
    handleSelect (
      value
    ) {
      function isMatchedArtist (
        artistData
      ) {
        return (
          artistData.uuid === value
        )
      }

      const artistData =
        this.artistsCollection.find(
          isMatchedArtist
        )

      this.setSelectedArtistData(
        artistData
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
