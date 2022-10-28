<template>
  <BaseDropdownContainer
    class="main-source-select-item-select"
    :header="headerText"
    @select="handleSelect"
  >
    <AlbumItem
      v-for="albumData in albumsCollection"
      :key="albumData.uuid"
      :album-data="albumData"
    />
  </BaseDropdownContainer>
</template>

<script>
import BaseDropdownContainer
  from '@/components/containers/dropdowns/BaseDropdownContainer.vue'
import AlbumItem from './AlbumSelect/AlbumItem.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'

export default {
  name: 'AlbumSelect',
  components: {
    BaseDropdownContainer,
    AlbumItem
  },
  inject: [
    'setSelectedAlbumData'
  ],
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
    headerText () {
      return this.$t(
        `select.${this.typeId}`
      )
    },
    albumsCollection () {
      return formatCollection(
        this.albums
      )
    }
  },
  methods: {
    handleSelect (
      value
    ) {
      function isMatchedAlbum (
        albumData
      ) {
        return (
          albumData.uuid === value
        )
      }

      const albumData =
        this.albumsCollection.find(
          isMatchedAlbum
        )

      this.setSelectedAlbumData(
        albumData
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
