<template>
  <div class="ui segments">
    <BaseSegmentContainer
      class="main-segment-container"
    >
      <BaseLinkContainer
        class="main-profile-page-info"
        :link="albumMainLinkFormatted"
      >
        <BaseImage
          class="rounded bordered main-profile-page-image"
          size="small"
          :image="image"
        />

        <BaseHeader
          tag="h3"
          :class="{ link: !isArtistNameActive }"
          :text="albumTitle"
        />

        <div
          :class="{ link: isArtistNameActive }"
          @mouseenter="handleArtistLinkMouseEnter"
          @mouseleave="handleArtistLinkMouseLeave"
        >
          {{ artistName }}
        </div>
      </BaseLinkContainer>

      <BaseDivider />

      <div class="main-profile-page-info">
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
        model="album"
        :profileId="profileId"
        :modelId="albumId"
        :modelTitle="albumFullTitle"
      />
    </BaseSegmentContainer>
  </div>
</template>

<script>
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
import BaseImage from '@/BaseImage.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseDivider from '@/BaseDivider.vue'
import BaseProfileLibraryDeleteButton
  from '@/models/profile/library/BaseProfileLibraryDeleteButton.vue'
import {
  main as formatProfileLibraryArtistMainLink
} from '#/formatters/links/profile/library/artist'
import { main as formatAlbumMainLink } from '#/formatters/links/album'
import { isCurrentProfile } from '#/utils'
import { date as formatDate } from '#/formatters'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    BaseLinkContainer,
    BaseImage,
    BaseHeader,
    BaseDivider,
    BaseProfileLibraryDeleteButton
  },
  props: {
    albumData: Object,
    profileId: String,
    albumId: String
  },
  data () {
    return {
      isArtistNameActive: false
    }
  },
  computed: {
    albumMainLinkFormatted () {
      if (this.isArtistNameActive) {
        return formatProfileLibraryArtistMainLink({
          profileId: this.profileId,
          artistId: this.artistId
        })
      } else {
        return formatAlbumMainLink({
          albumTitle: this.albumTitle,
          artistName: this.artistName
        })
      }
    },
    artistId () {
      return this.albumData.artist.id
    },
    albumFullTitle () {
      return `${this.artistName} - ${this.albumTitle}`
    },
    albumTitle () {
      return this.albumData.title
    },
    artistName () {
      return this.albumData.artist.name
    },
    image () {
      return this.albumData.image.medium
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
      return this.albumData.created
    }
  },
  methods: {
    handleArtistLinkMouseEnter () {
      this.isArtistNameActive = true
    },
    handleArtistLinkMouseLeave () {
      this.isArtistNameActive = false
    },
    isCurrentProfile
  }
}
</script>

<style lang="sass" scoped></style>
