<template>
  <div class="main-source-select-container">
    <div class="main-source-select-content">
      <SourceSelect
        ref="select"
        :query="artistName"
      />

      <template v-if="selectedSourceData">
        <ArtistSelect
          :key="artistSelectKey"
          :artists="selectedSourceArtists"
        />

        <TypeSelect
          v-if="selectedSourceData.types"
          :key="typeSelectKey"
          :types="selectedSourceData.types"
        />
      </template>
    </div>

    <BaseClearButton
      v-if="selectedSourceData"
      @click="handleClearButtonClick"
    />
  </div>
</template>

<script>
import SourceSelect from './BaseAlbumsSourceSelect/SourceSelect.vue'
import ArtistSelect from './BaseAlbumsSourceSelect/ArtistSelect.vue'
import TypeSelect from './BaseAlbumsSourceSelect/TypeSelect.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'BaseArtistAlbumsSourceSelect',
  components: {
    SourceSelect,
    ArtistSelect,
    TypeSelect,
    BaseClearButton
  },
  provide () {
    return {
      setSelectedSourceData:
        this.setSelectedSourceData,
      setSelectedArtistData:
        this.setSelectedArtistData,
      setSelectedTypeId:
        this.setSelectedTypeId
    }
  },
  inject: [
    'setRequestArtistData',
    'resetRequestArtistData'
  ],
  props: {
    artistName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      artistSelectKey: null,
      selectedArtistData: null,
      selectedSourceData: null,
      selectedTypeId: null,
      typeSelectKey: null
    }
  },
  computed: {
    selectedSourceArtists () {
      return this.selectedSourceData.artists
    }
  },
  watch: {
    selectedSourceData:
      'handleSelectedSourceDataChange',
    selectedArtistData:
      'handleSelectedArtistDataChange',
    selectedTypeId:
      'handleSelectedTypeIdChange'
  },
  methods: {
    handleSelectedSourceDataChange () {
      this.artistSelectKey = generateKey()
      this.typeSelectKey = generateKey()

      this.selectedArtistData = null
      this.selectedTypeId = null
    },
    handleSelectedArtistDataChange (
      value
    ) {
      if (value) {
        this.setRequestArtistData(
          value
        )
      }
    },
    handleSelectedTypeIdChange (
      value
    ) {
      if (this.selectedArtistData) {
        this.selectedArtistData = {
          ...this.selectedArtistData,
          albumType: value
        }
      }
    },
    handleClearButtonClick () {
      this.resetSelect()

      this.selectedSourceData = null

      this.resetRequestArtistData()
    },
    setSelectedSourceData (
      value
    ) {
      this.selectedSourceData = value
    },
    setSelectedArtistData (
      value
    ) {
      this.selectedArtistData = {
        ...value,
        albumType: this.selectedTypeId
      }
    },
    setSelectedTypeId (
      value
    ) {
      this.selectedTypeId = value
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
