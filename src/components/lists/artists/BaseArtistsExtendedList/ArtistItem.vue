<template>
  <BaseVisibilityItem
    ref="visibility"
    @init="handleInit"
    @visible="handleVisible"
  />

  <BaseArtistContainer
    :artistName="artistName"
    :isVisible="isVisible"
    @loadEnd="handleLoadEnd"
  >
    <template #default="slotProps">
      <BaseArtistHorizontalCardContainer
        :isLoading="slotProps.isLoading"
        :error="slotProps.error"
        @refresh="slotProps.handleRefresh"
      >
        <template v-if="slotProps.artistData">
          <BaseArtistImage
            class="circular bordered artist-image"
            size="small"
            :artistName="artistName"
          />

          <InfoBlock :artistData="slotProps.artistData" />
        </template>
      </BaseArtistHorizontalCardContainer>
    </template>
  </BaseArtistContainer>
</template>

<script>
import BaseVisibilityItem from '@/BaseVisibilityItem.vue'
import BaseArtistContainer from '@/containers/artist/BaseArtistContainer.vue'
import BaseArtistHorizontalCardContainer
  from '@/containers/artist/BaseArtistHorizontalCardContainer.vue'
import BaseArtistImage from '@/models/artist/BaseArtistImage.vue'
import InfoBlock from './ArtistItem/InfoBlock.vue'

export default {
  name: 'ArtistItem',
  components: {
    BaseVisibilityItem,
    BaseArtistContainer,
    BaseArtistHorizontalCardContainer,
    BaseArtistImage,
    InfoBlock
  },
  props: {
    artistName: {
      type: String,
      required: true
    }
  },
  emits: [
    'init',
    'loadEnd'
  ],
  data () {
    return {
      isVisible: false
    }
  },
  methods: {
    handleInit (el) {
      this.$emit('init', el)
    },
    handleVisible () {
      this.isVisible = true
    },
    handleLoadEnd () {
      this.$emit('loadEnd')
    }
  }
}
</script>

<style lang="sass" scoped>
.artist-image
  width: 150px
  height: 150px
  margin-right: 1em
</style>
