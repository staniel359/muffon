<template>
  <div>
    <div class="main-source-select-container">
      <div class="main-source-select-content">
        <SourceSelect
          ref="select"
          :query="query"
        />

        <template v-if="selectedSourceData">
          <TypeSelect
            v-if="isSelectedSourceWithMultipleTypes"
            :key="typeSelectKey"
            :albums-data="selectedSourceAlbumsData"
            :types="selectedSourceTypes"
          />

          <AlbumSelect
            v-if="selectedTypeId"
            :key="albumSelectKey"
            :albums="selectedTypeAlbums"
            :type-id="selectedTypeId"
          />
        </template>
      </div>

      <BaseClearButton
        v-if="selectedSourceData"
        @click="handleClearButtonClick"
      />
    </div>
  </div>
</template>

<script>
import SourceSelect from './BaseAlbumSourceSelect/SourceSelect.vue'
import TypeSelect from './BaseAlbumSourceSelect/TypeSelect.vue'
import AlbumSelect from './BaseAlbumSourceSelect/AlbumSelect.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import {
  generateKey
} from '@/helpers/utils'

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
      setSelectedSourceData:
        this.setSelectedSourceData,
      setSelectedTypeId:
        this.setSelectedTypeId,
      setSelectedAlbumData:
        this.setSelectedAlbumData
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
      ].join(
        ' - '
      )
    },
    albumTitle () {
      return this.albumData.title
    },
    artistName () {
      return this.albumData.artist.name
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
        return `${this.selectedTypeId}s`
      } else {
        return null
      }
    }
  },
  watch: {
    selectedSourceData:
      'handleSelectedSourceDataChange',
    selectedTypeId:
      'handleSelectedTypeIdChange',
    selectedAlbumData:
      'handleSelectedAlbumDataChange'
  },
  methods: {
    handleSelectedSourceDataChange () {
      this.typeSelectKey = generateKey()
      this.albumSelectKey = generateKey()
    },
    handleSelectedTypeIdChange () {
      this.albumSelectKey = generateKey()
    },
    handleSelectedAlbumDataChange (
      value
    ) {
      this.setRequestAlbumData(
        value
      )
    },
    handleClearButtonClick () {
      this.resetSelect()

      this.selectedSourceData = null

      this.resetRequestAlbumData()
    },
    setSelectedSourceData (
      value
    ) {
      this.selectedSourceData = value

      if (this.isSelectedSourceWithMultipleTypes) {
        this.selectedTypeId = null
      } else {
        this.selectedTypeId = 'album'
      }
    },
    setSelectedTypeId (
      value
    ) {
      this.selectedTypeId = value
    },
    setSelectedAlbumData (
      value
    ) {
      this.selectedAlbumData = {
        ...value,
        albumType: this.selectedTypeId
      }
    },
    resetSelect () {
      this.$refs
        .select
        .reset()
    }
  }
}
</script>

<style lang="sass" scoped></style>
