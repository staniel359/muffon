<template>
  <div class="ui segments">
    <BaseSegmentContainer
      class="main-segment-container"
    >
      <BaseLinkContainer
        class="main-profile-page-info"
        :link="trackMainLinkFormatted"
      >
        <BaseImage
          class="rounded bordered main-profile-page-image"
          size="small"
          :image="imageData.medium"
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

        <BaseSelfIcons
          :favoriteId="favoriteId"
        />
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
      v-if="isRenderOptions"
    >
      <div class="main-options-dropdown-container-right">
        <BaseOptionsDropdown
          model="track"
          :trackTitle="trackTitle"
          :artistName="artistName"
          :albumTitle="albumTitle"
          :favoriteId="favoriteId"
          isWithFavoriteOption
          isWithPlaylistOption
          isWithDeleteOption
          @delete="handleDeleteOptionClick"
          @playlist="handlePlaylistOptionClick"
        />
      </div>

      <BasePlaylistsModal
        ref="playlistModal"
        :trackTitle="trackTitle"
        :artistName="artistName"
        :albumTitle="albumTitle"
        :imageUrl="imageData.medium"
      />

      <BaseProfileLibraryDeleteModal
        ref="deleteModal"
        model="track"
        :profileId="profileId"
        :modelId="trackId"
        :modelTitle="trackFullTitle"
        isDeleteWithRedirect
      />
    </BaseSegmentContainer>
  </div>
</template>

<script>
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
import BaseImage from '@/BaseImage.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseSelfIcons from '@/models/self/BaseSelfIcons.vue'
import BaseDivider from '@/BaseDivider.vue'
import BaseOptionsDropdown from '@/dropdowns/BaseOptionsDropdown.vue'
import BasePlaylistsModal from '@/modals/playlists/BasePlaylistsModal.vue'
import BaseProfileLibraryDeleteModal
  from '@/modals/profile/library/BaseProfileLibraryDeleteModal.vue'
import {
  main as formatProfileLibraryArtistMainLink
} from '#/formatters/links/profile/library/artist'
import {
  main as formatProfileLibraryAlbumMainLink
} from '#/formatters/links/profile/library/album'
import { main as formatTrackMainLink } from '#/formatters/links/track'
import { isCurrentProfile } from '#/utils'
import { date as formatDate } from '#/formatters'
import formatTrackSourceParams
  from '#/actions/api/track/formatters/requestData'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    BaseLinkContainer,
    BaseImage,
    BaseHeader,
    BaseSelfIcons,
    BaseDivider,
    BaseOptionsDropdown,
    BasePlaylistsModal,
    BaseProfileLibraryDeleteModal
  },
  provide () {
    return {
      setFavoriteId: this.setFavoriteId
    }
  },
  props: {
    trackData: Object,
    profileId: String,
    trackId: String
  },
  data () {
    return {
      favoriteId: null,
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
          artistName: this.artistName,
          sourceParams: this.sourceParams
        })
      }
    },
    sourceParams () {
      return formatTrackSourceParams({
        sourceId: 'lastfm',
        trackData: this.trackData
      })
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
    imageData () {
      return this.trackData.image
    },
    sinceFormatted () {
      return this.$t(
        'pages.profile.library.since'
      )
    },
    createdFormatted () {
      return formatDate(
        this.created
      )
    },
    created () {
      return this.trackData.created
    },
    isRenderOptions () {
      return isCurrentProfile(
        this.profileId
      )
    }
  },
  mounted () {
    this.favoriteId =
      this.trackData.favorite_id?.toString()
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
    handleDeleteOptionClick () {
      this.$refs.deleteModal.show()
    },
    handlePlaylistOptionClick () {
      this.$refs.playlistModal.show()
    },
    setFavoriteId (value) {
      this.favoriteId = value
    }
  }
}
</script>

<style lang="sass" scoped>
.main-profile-page-image
  width: 120px
  height: 120px

.main-self-icons
  margin-top: 0.25em
</style>
