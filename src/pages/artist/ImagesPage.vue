<template>
  <BaseArtistPaginatedPageContainer
    :key="refreshKey"
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
import pageMixin from '@/mixins/pageMixin'

export default {
  name: 'ImagesPage',
  components: {
    BaseArtistPaginatedPageContainer,
    ImagesSection
  },
  mixins: [
    pageMixin
  ],
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
