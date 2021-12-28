<template>
  <div class="main-source-select-container">
    <div class="main-source-select-content">
      <SourceSelect
        ref="source"
        :query="query"
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
      </template>
    </div>

    <BaseClearButton
      v-if="selectedSourceData"
      class="main-source-select-reset-button"
      @click="handleReset"
    />
  </div>
</template>

<script>
import SourceSelect from './BaseAlbumSourceSelect/SourceSelect.vue'
import TypeSelect from './BaseAlbumSourceSelect/TypeSelect.vue'
import AlbumSelect from './BaseAlbumSourceSelect/AlbumSelect.vue'
import BaseClearButton from '@/buttons/BaseClearButton.vue'
import { generateKey } from '#/utils'
import formatAlbumRequestData from '#/formatters/request/album/requestData'
import { artistName as formatArtistName } from '#/formatters/artist'

export default {
  name: 'BaseAlbumSourceSelect',
  components: {
    SourceSelect,
    TypeSelect,
    AlbumSelect,
    BaseClearButton
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
    albumData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      albumSelectKey: null,
      selectedAlbumData: null,
      selectedSourceData: null,
      selectedTypeId: null,
      typeSelectKey: null
    }
  },
  computed: {
    query () {
      return [
        this.artistName,
        this.albumTitle
      ].join(' - ')
    },
    albumTitle () {
      return this.albumData.title
    },
    artistName () {
      return formatArtistName(
        this.artists
      )
    },
    artists () {
      return this.albumData.artists
    },
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
      this.selectedAlbumData =
        formatAlbumRequestData({
          sourceId: this.selectedSourceId,
          albumData: value
        })
    }
  }
}
</script>

<style lang="sass" scoped></style>
