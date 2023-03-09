<template>
  <BaseArtistPaginatedPageContainer
    :artist-name="artistName"
    :scope="scope"
    :limit="limit"
  >
    <template
      #default="slotProps"
    >
      <ImagesSection
        :images="slotProps[scope]"
      />
    </template>
  </BaseArtistPaginatedPageContainer>
</template>

<script>
import BaseArtistPaginatedPageContainer
  from '@/components/containers/pages/artist/BaseArtistPaginatedPageContainer.vue'
import ImagesSection from './ImagesPage/ImagesSection.vue'
import {
  images as imagesLimits
} from '@/helpers/data/limits'

export default {
  name: 'ImagesPage',
  components: {
    BaseArtistPaginatedPageContainer,
    ImagesSection
  },
  props: {
    artistName: String
  },
  data () {
    return {
      limit:
        imagesLimits.simple.large,
      scope: 'images'
    }
  }
}
</script>

<style lang="sass" scoped></style>
