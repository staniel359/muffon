<template>
  <BaseArtistContainer :artistName="artistName">
    <template #default="slotProps">
      <BaseArtistHorizontalCardContainer
        :isLoading="slotProps.isLoading"
        :error="slotProps.error"
        @refresh="slotProps.handleRefresh"
      >
        <template v-if="slotProps.artistData">
          <BaseArtistImage
            class="circular bordered artist-image"
            :image="image"
            :artistName="artistName"
            @loadEnd="handleImageLoadEnd"
          />

          <InfoBlock :artistData="slotProps.artistData" />
        </template>
      </BaseArtistHorizontalCardContainer>
    </template>
  </BaseArtistContainer>
</template>

<script>
import BaseArtistContainer from '@/containers/artist/BaseArtistContainer.vue'
import BaseArtistHorizontalCardContainer
  from '@/containers/artist/BaseArtistHorizontalCardContainer.vue'
import BaseArtistImage from '@/models/artist/BaseArtistImage.vue'
import InfoBlock from './ArtistItem/InfoBlock.vue'

export default {
  name: 'ArtistItem',
  components: {
    BaseArtistContainer,
    BaseArtistHorizontalCardContainer,
    BaseArtistImage,
    InfoBlock
  },
  inject: [
    'setPaginationItemImage'
  ],
  props: {
    artistData: {
      type: Object,
      required: true
    }
  },
  computed: {
    artistName () {
      return this.artistData.name
    },
    image () {
      return this.artistData.image
    },
    uuid () {
      return this.artistData.uuid
    }
  },
  methods: {
    handleImageLoadEnd (image) {
      this.setPaginationItemImage({
        uuid: this.uuid,
        image
      })
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
