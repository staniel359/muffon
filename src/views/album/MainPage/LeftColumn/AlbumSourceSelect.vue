<template>
  <SourceSelect
    ref="source"
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

    <ResetButton @click="handleReset"/>
  </template>
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
    'setRequestAlbumData',
    'resetRequestAlbumData'
  ],
  props: {
    albumTitle: String,
    artistName: String
  },
  data () {
    return {
      albumSelectKey: null,
      selectedAlbumData: null,
      selectedSourceData: null,
      selectedTypeId: null,
      sourceSelectKey: null,
      typeSelectKey: null
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
        if (this.selectedTypeId === 'albumVarious') {
          return 'albums_various'
        } else {
          return `${this.selectedTypeId}s`
        }
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
    handleReset () {
      this.$refs.source.reset()

      this.selectedSourceData = null

      this.resetRequestAlbumData()
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
