<template>
  <div class="main-model-source-select-container">
    <div class="content">
      <div>
        <SourceSelect
          ref="select"
          :query="query"
        />

        <div
          v-if="isRenderTypeSelect"
          class="bottom-section"
        >
          <TypeSelect
            :key="typeSelectKey"
            :albums-data="selectedSourceAlbumsData"
            :types="selectedSourceTypes"
          />
        </div>
      </div>

      <div
        v-if="isRenderAlbumSelect"
        class="right-section"
      >
        <AlbumSelect
          :key="albumSelectKey"
          :albums="selectedTypeAlbums"
          :type-id="selectedTypeId"
        />
      </div>
    </div>

    <BaseClearButton
      v-if="selectedSourceData"
      @click="handleClearButtonClick"
    />
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
    },
    isRenderTypeSelect () {
      return (
        this.selectedSourceData &&
          this.isSelectedSourceWithMultipleTypes
      )
    },
    isRenderAlbumSelect () {
      return (
        this.selectedSourceData &&
          this.selectedTypeId
      )
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
