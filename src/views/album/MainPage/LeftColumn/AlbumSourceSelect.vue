<template>
  <div>
    <SourceSelect
      :artistName="artistName"
      :albumTitle="albumTitle"
    />

    <template v-if="selectedSourceData">
      <TypeSelect
        v-if="isSelectedSourceWithMultipleTypes"
        :key="typeSelectKey"
        :albumsData="selectedSourceAlbumsData"
        :types="selectedSourceTypes"
      />

      <AlbumSelect
        v-if="selectedTypeId"
        :key="albumSelectKey"
        :albums="selectedTypeAlbums"
        :typeId="selectedTypeId"
      />

      <ResetButton />
    </template>
  </div>
</template>

<script>
import SourceSelect from './AlbumSourceSelect/SourceSelect.vue'
import TypeSelect from './AlbumSourceSelect/TypeSelect.vue'
import AlbumSelect from './AlbumSourceSelect/AlbumSelect.vue'
import ResetButton from './AlbumSourceSelect/ResetButton.vue'
import { generateKey } from '#/utils'
import formatAlbumRequestData from '#/actions/api/album/formatters/requestData'

export default {
  name: 'AlbumSourceSelect',
  components: {
    SourceSelect,
    TypeSelect,
    AlbumSelect,
    ResetButton
  },
  provide () {
    return {
      setSelectedSourceData: this.setSelectedSourceData,
      setSelectedTypeId: this.setSelectedTypeId,
      setSelectedAlbumData: this.setSelectedAlbumData
    }
  },
  inject: [
    'setRequestAlbumData'
  ],
  props: {
    albumTitle: String,
    artistName: String
  },
  data () {
    return {
      selectedSourceData: null,
      selectedTypeId: null,
      selectedAlbumData: null,
      typeSelectKey: null,
      albumSelectKey: null
    }
  },
  computed: {
    isSelectedSourceWithMultipleTypes () {
      return this.selectedSourceTypes.length > 1
    },
    selectedSourceTypes () {
      return this.selectedSourceData.types
    },
    selectedSourceAlbumsData () {
      return this.selectedSourceData.albumsData
    },
    selectedTypeAlbums () {
      return this.selectedSourceAlbumsData[
        this.selectedScope
      ]
    },
    selectedScope () {
      if (this.selectedTypeId) {
        return `${this.selectedTypeId}s`
      } else {
        return null
      }
    },
    selectedSourceId () {
      return this.selectedSourceData.id
    }
  },
  watch: {
    selectedSourceData: 'handleSelectedSourceDataChange',
    selectedTypeId: 'handleSelectedTypeIdChange',
    selectedAlbumData: 'handleSelectedAlbumDataChange'
  },
  methods: {
    handleSelectedSourceDataChange () {
      this.typeSelectKey = generateKey()
      this.albumSelectKey = generateKey()
    },
    handleSelectedTypeIdChange () {
      this.albumSelectKey = generateKey()
    },
    handleSelectedAlbumDataChange (value) {
      this.setRequestAlbumData({
        ...value,
        albumType: this.selectedTypeId
      })
    },
    setSelectedSourceData (value) {
      this.selectedSourceData = value

      if (this.isSelectedSourceWithMultipleTypes) {
        this.selectedTypeId = null
      } else {
        this.selectedTypeId = 'album'
      }
    },
    setSelectedTypeId (value) {
      this.selectedTypeId = value
    },
    setSelectedAlbumData (value) {
      this.selectedAlbumData = formatAlbumRequestData({
        sourceId: this.selectedSourceId,
        albumData: value
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
