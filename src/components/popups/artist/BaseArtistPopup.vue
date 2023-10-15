<template>
  <BaseSegmentContainer
    ref="segment"
    class="main-popup-content-container"
    :response-data="artistData"
    :is-loading="isLoading"
    :error="error"
    @refresh="handleRefresh"
  >
    <ContentBlock
      v-if="artistData"
      :artist-data="artistData"
      :is-visible="isVisible"
      @link-click="handleLinkClick"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import ContentBlock from './BaseArtistPopup/ContentBlock.vue'
import getArtist from '@/helpers/actions/api/artist/get'

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
    artistData: 'handleArtistDataChange'
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
    handleArtistDataChange () {
      this.$emit(
        'artistDataChange'
      )
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

<style lang="sass" scoped></style>
