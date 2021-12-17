<template>
  <div class="ui raised segments main-segment-container">
    <BaseSegmentContainer>
      <BaseLinkContainer
        class="main-profile-page-info"
        :link="link"
      >
        <BaseImage
          class="rounded bordered main-profile-page-image"
          model="track"
          size="small"
          :image="imageData?.medium"
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

      <div
        v-if="favoriteId || isRenderOptions"
        class="main-self-container"
      >
        <BaseSelfIcons
          :favoriteId="favoriteId"
        />

        <template
          v-if="isRenderOptions"
        >
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

          <BasePlaylistsModal
            ref="playlistModal"
            :trackTitle="trackTitle"
            :artistName="artistName"
            :albumTitle="albumTitle"
            :imageUrl="imageData?.original"
          />

          <BaseProfileLibraryDeleteModal
            ref="deleteModal"
            model="track"
            :profileId="profileId"
            :modelId="trackId"
            :modelName="trackFullTitle"
            isDeleteWithRedirect
          />
        </template>
      </div>

      <BaseDivider />

      <div class="main-profile-page-info">
        <div>
          {{ sinceText }}
        </div>
        <strong>
          {{ createdFormatted }}
        </strong>
      </div>
    </BaseSegmentContainer>
  </div>
</template>

<script>
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BaseLinkContainer from '@/containers/links/BaseLinkContainer.vue'
import BaseImage from '@/images/BaseImage.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseSelfIcons from '@/models/self/BaseSelfIcons.vue'
import BaseOptionsDropdown from '@/dropdowns/BaseOptionsDropdown.vue'
import BasePlaylistsModal from '@/modals/playlists/BasePlaylistsModal.vue'
import BaseProfileLibraryDeleteModal
  from '@/modals/profile/library/BaseProfileLibraryDeleteModal.vue'
import BaseDivider from '@/BaseDivider.vue'
import {
  main as formatProfileLibraryArtistMainLink
} from '#/formatters/links/profile/library/artist'
import {
  main as formatProfileLibraryAlbumMainLink
} from '#/formatters/links/profile/library/album'
import { main as formatTrackMainLink } from '#/formatters/links/track'
import { isCurrentProfile } from '#/utils'
import { date as formatDate } from '#/formatters'
import formatTrackRequestData from '#/formatters/request/track/requestData'

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
    link () {
      if (this.isArtistNameActive) {
        return this.profileLibraryArtistMainLink
      } else if (this.isAlbumTitleActive) {
        return this.profileLibraryAlbumMainLink
      } else {
        return this.trackMainLink
      }
    },
    profileLibraryArtistMainLink () {
      return formatProfileLibraryArtistMainLink({
        profileId: this.profileId,
        artistId: this.artistId
      })
    },
    artistId () {
      return this.trackData.artist.id
    },
    profileLibraryAlbumMainLink () {
      return formatProfileLibraryAlbumMainLink({
        profileId: this.profileId,
        albumId: this.albumId
      })
    },
    albumId () {
      return this.trackData.album.id
    },
    trackMainLink () {
      return formatTrackMainLink({
        trackTitle: this.trackTitle,
        artistName: this.artistName,
        sourceParams: this.sourceParams
      })
    },
    trackTitle () {
      return this.trackData.title
    },
    artistName () {
      return this.trackData.artist.name
    },
    sourceParams () {
      return formatTrackRequestData({
        sourceId: 'lastfm',
        trackData: this.trackData
      })
    },
    trackFullTitle () {
      return `${this.artistName} - ${this.trackTitle}`
    },
    albumTitle () {
      return this.trackData.album?.title
    },
    imageData () {
      return this.trackData.image
    },
    sinceText () {
      return this.$t(
        'library.since'
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
</style>
