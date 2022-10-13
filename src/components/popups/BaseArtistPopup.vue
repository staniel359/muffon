<template>
  <BaseSegmentContainer
    ref="segment"
    class="basic main-segment-container artist-segment"
    :response-data="artistData"
    :is-loading="isLoading"
    :error="error"
    @refresh="handleRefresh"
  >
    <ContentBlock
      v-if="artistData"
      :key="key"
      :artist-data="artistData"
      @link-click="handleLinkClick"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import ContentBlock from './BaseArtistPopup/ContentBlock.vue'
import getArtist from '@/helpers/actions/api/artist/get'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'BaseArtistPopup',
  components: {
    BaseSegmentContainer,
    ContentBlock
  },
  provide () {
    return {
      updateArtistImage:
        this.updateArtistImage
    }
  },
  props: {
    artistName: {
      type: String,
      required: true
    },
    isCalled: Boolean,
    isVisible: Boolean
  },
  emits: [
    'artistDataChange',
    'linkClick'
  ],
  data () {
    return {
      key: null,
      artistData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    artistArgs () {
      return {
        artistName: this.artistName
      }
    }
  },
  watch: {
    isCalled: 'handleIsCalledChange',
    artistData: 'handleArtistDataChange',
    isVisible: 'handleIsVisibleChange'
  },
  methods: {
    getArtist,
    handleIsCalledChange (
      value
    ) {
      if (value) {
        this.getData()
      }
    },
    handleArtistDataChange (
      value
    ) {
      this.$emit(
        'artistDataChange'
      )
    },
    handleIsVisibleChange (
      value
    ) {
      if (value) {
        this.key = generateKey()
      }
    },
    handleRefresh () {
      this.getData()
    },
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    getData () {
      this.getArtist(
        this.artistArgs
      )
    },
    updateArtistImage (
      value
    ) {
      this.artistData.image = value
    }
  }
}
</script>

<style lang="sass" scoped>
.artist-segment
  @extend .no-padding, .no-margin
</style>
