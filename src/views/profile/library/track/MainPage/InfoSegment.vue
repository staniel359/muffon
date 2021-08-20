<template>
  <div class="ui segments">
    <BaseSegmentContainer
      class="main-segment-container"
    >
      <BaseLinkContainer
        class="main-library-info"
        :link="trackMainLinkFormatted"
      >
        <BaseImage
          class="rounded bordered main-library-info-image"
          size="small"
          :image="image"
        />

        <BaseHeader
          tag="h4"
          :class="{ link: isHeaderLink }"
          :text="trackTitle"
        />

        <div
          :class="{ link: isArtistNameActive }"
          @mouseenter="handleArtistLinkMouseEnter"
          @mouseleave="handleArtistLinkMouseLeave"
        >
          {{ artistName }}
        </div>

        <div
          v-if="albumTitle"
          class="main-small-container"
          :class="{ link: isAlbumTitleActive }"
          @mouseenter="handleAlbumLinkMouseEnter"
          @mouseleave="handleAlbumLinkMouseLeave"
        >
          <small>
            {{ albumTitle }}
          </small>
        </div>
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
        model="track"
        :profileId="profileId"
        :modelId="trackId"
        :modelFullTitle="trackFullTitle"
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
import {
  main as formatProfileLibraryAlbumMainLink
} from '#/formatters/links/profile/library/album'
import { main as formatTrackMainLink } from '#/formatters/links/track'
import { localize } from '#/actions/plugins/i18n'
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
    trackData: Object,
    profileId: String,
    trackId: String
  },
  data () {
    return {
      isArtistNameActive: false,
      isAlbumTitleActive: false
    }
  },
  computed: {
    isHeaderLink () {
      return (
        !this.isArtistNameActive &&
          !this.isAlbumTitleActive
      )
    },
    trackMainLinkFormatted () {
      if (this.isArtistNameActive) {
        return formatProfileLibraryArtistMainLink({
          profileId: this.profileId,
          artistId: this.artistId
        })
      } else if (this.isAlbumTitleActive) {
        return formatProfileLibraryAlbumMainLink({
          profileId: this.profileId,
          albumId: this.albumId
        })
      } else {
        return formatTrackMainLink({
          trackTitle: this.trackTitle,
          artistName: this.artistName
        })
      }
    },
    trackFullTitle () {
      return `${this.artistName} - ${this.trackTitle}`
    },
    trackTitle () {
      return this.trackData.title
    },
    artistId () {
      return this.trackData.artist.id
    },
    artistName () {
      return this.trackData.artist.name
    },
    albumId () {
      return this.trackData.album.id
    },
    albumTitle () {
      return this.trackData.album?.title
    },
    image () {
      return this.trackData.image.medium
    },
    sinceFormatted () {
      return localize(
        'pages.library.since'
      )
    },
    createdFormatted () {
      return formatDate(
        this.created
      )
    },
    created () {
      return this.trackData.created
    }
  },
  methods: {
    handleArtistLinkMouseEnter () {
      this.isArtistNameActive = true
    },
    handleArtistLinkMouseLeave () {
      this.isArtistNameActive = false
    },
    handleAlbumLinkMouseEnter () {
      this.isAlbumTitleActive = true
    },
    handleAlbumLinkMouseLeave () {
      this.isAlbumTitleActive = false
    },
    isCurrentProfile
  }
}
</script>

<style lang="sass" scoped>
.main-library-info-image
  width: 120px
  height: 120px
</style>
