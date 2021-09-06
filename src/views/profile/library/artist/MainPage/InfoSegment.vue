<template>
  <div class="ui segments">
    <BaseSegmentContainer
      class="main-segment-container"
    >
      <BaseLinkContainer
        class="main-library-info"
        :link="artistMainLinkFormatted"
      >
        <BaseArtistImage
          class="circular bordered main-library-info-image"
          size="medium"
          :image="image"
          :artistName="artistName"
        />

        <BaseHeader
          class="link"
          tag="h3"
          :text="artistName"
        />
      </BaseLinkContainer>

      <BaseDivider />

      <div class="main-library-info">
        <div>
          {{ sinceFormatted }}
        </div>
        <strong>
          {{ createdFormatted }}
        </strong>
      </div>
    </BaseSegmentContainer>

    <BaseSegmentContainer
      v-if="isCurrentProfile(profileId)"
    >
      <BaseProfileLibraryDeleteButton
        model="artist"
        :profileId="profileId"
        :modelId="artistId"
        :modelTitle="artistName"
      />
    </BaseSegmentContainer>
  </div>
</template>

<script>
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
import BaseArtistImage from '@/models/artist/BaseArtistImage.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseDivider from '@/BaseDivider.vue'
import BaseProfileLibraryDeleteButton
  from '@/models/profile/library/BaseProfileLibraryDeleteButton.vue'
import { main as formatArtistMainLink } from '#/formatters/links/artist'
import { isCurrentProfile } from '#/utils'
import { date as formatDate } from '#/formatters'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    BaseLinkContainer,
    BaseArtistImage,
    BaseHeader,
    BaseDivider,
    BaseProfileLibraryDeleteButton
  },
  props: {
    artistData: Object,
    profileId: String,
    artistId: String
  },
  computed: {
    artistMainLinkFormatted () {
      return formatArtistMainLink({
        artistName: this.artistName
      })
    },
    artistName () {
      return this.artistData.name
    },
    image () {
      return this.artistData.image
    },
    sinceFormatted () {
      return this.$t(
        'pages.library.since'
      )
    },
    createdFormatted () {
      return formatDate(
        this.created
      )
    },
    created () {
      return this.artistData.created
    }
  },
  methods: {
    isCurrentProfile
  }
}
</script>

<style lang="sass" scoped>
.main-library-info-image
  width: 120px
  height: 120px
</style>
