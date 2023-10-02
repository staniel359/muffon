<template>
  <div class="main-model-source-select-container">
    <div class="content">
      <div>
        <SourceSelect
          ref="select"
          :query="artistName"
        />
      </div>

      <div
        v-if="selectedSourceData"
        class="right-section"
      >
        <ArtistSelect
          :key="artistSelectKey"
          :artists="selectedSourceArtists"
        />

        <div
          v-if="selectedSourceData.types"
          class="bottom-section"
        >
          <TypeSelect
            :key="typeSelectKey"
            :types="selectedSourceData.types"
          />
        </div>
      </div>
    </div>

    <BaseClearButton
      v-if="selectedSourceData"
      @click="handleClearButtonClick"
    />
  </div>
</template>

<script>
import SourceSelect from './BaseArtistAlbumsSourceSelect/SourceSelect.vue'
import ArtistSelect from './BaseArtistAlbumsSourceSelect/ArtistSelect.vue'
import TypeSelect from './BaseArtistAlbumsSourceSelect/TypeSelect.vue'
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
      setSelectedTypeData:
        this.setSelectedTypeData
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
      selectedTypeData: null,
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
    selectedTypeData:
      'handleSelectedTypeDataChange'
  },
  methods: {
    handleSelectedSourceDataChange () {
      this.artistSelectKey = generateKey()
      this.typeSelectKey = generateKey()

      this.selectedArtistData = null
      this.selectedTypeData = null
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
    handleSelectedTypeDataChange (
      value
    ) {
      if (this.selectedArtistData) {
        this.selectedArtistData = {
          ...this.selectedArtistData,
          albumType: value.id
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
      const albumType =
        this.selectedTypeData?.id

      this.selectedArtistData = {
        ...value,
        albumType
      }
    },
    setSelectedTypeData (
      value
    ) {
      this.selectedTypeData = value
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
