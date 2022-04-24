<template>
  <div
    :class="[
      'ui raised segments',
      'main-segment-container'
    ]"
  >
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
          :class="{
            link: isHeaderLink
          }"
          :text="trackTitle"
        />

        <div
          :class="{
            link: isArtistNameActive
          }"
          @mouseenter="handleArtistLinkMouseEnter"
          @mouseleave="handleArtistLinkMouseLeave"
          v-text="artistName"
        />

        <div
          v-if="albumTitle"
          class="main-small-container"
          :class="{
            link: isAlbumTitleActive
          }"
          @mouseenter="handleAlbumLinkMouseEnter"
          @mouseleave="handleAlbumLinkMouseLeave"
        >
          <small
            v-text="albumTitle"
          />
        </div>
      </BaseLinkContainer>

      <div
        v-if="favoriteId || isSelf"
        class="main-self-container"
      >
        <BaseSelfIcons
          :favorite-id="favoriteId"
        />

        <template
          v-if="isSelf"
        >
          <BaseOptionsDropdown
            model="track"
            :track-title="trackTitle"
            :artist-name="artistName"
            :album-title="albumTitle"
            :favorite-id="favoriteId"
            is-with-favorite-option
            is-with-playlist-option
            is-with-delete-option
            @delete-option-click="handleDeleteOptionClick"
            @playlist-option-click="handlePlaylistOptionClick"
          />

          <BasePlaylistsModal
            ref="playlistsModal"
            :track-title="trackTitle"
            :artist-name="artistName"
            :album-title="albumTitle"
            :image-url="imageData?.original"
          />

          <BaseProfileLibraryDeleteModal
            ref="deleteModal"
            model="track"
            :profile-id="profileId"
            :model-id="trackId"
            :model-name="trackFullTitle"
            is-delete-with-redirect
          />
        </template>
      </div>

      <BaseDivider />

      <div class="main-profile-page-info">
        <div
          v-text="sinceText"
        />

        <strong
          v-text="createdFormatted"
        />
      </div>
    </BaseSegmentContainer>
  </div>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseLinkContainer
  from '*/components/containers/links/BaseLinkContainer.vue'
import BaseImage from '*/components/images/BaseImage.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseSelfIcons from '*/components/models/self/BaseSelfIcons.vue'
import BaseOptionsDropdown
  from '*/components/dropdowns/BaseOptionsDropdown.vue'
import BasePlaylistsModal
  from '*/components/modals/playlists/BasePlaylistsModal.vue'
import BaseProfileLibraryDeleteModal
  from '*/components/modals/profile/library/BaseProfileLibraryDeleteModal.vue'
import BaseDivider from '*/components/BaseDivider.vue'
import {
  main as formatProfileLibraryArtistMainLink
} from '*/helpers/formatters/links/profile/library/artist'
import {
  main as formatProfileLibraryAlbumMainLink
} from '*/helpers/formatters/links/profile/library/album'
import {
  main as formatTrackMainLink
} from '*/helpers/formatters/links/track'
import {
  isCurrentProfile
} from '*/helpers/utils'
import {
  date as formatDate
} from '*/helpers/formatters'
import formatTrackRequestData from '*/helpers/formatters/request/track/data'

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
    profileId: {
      type: String,
      required: true
    },
    trackData: Object,
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
      return formatProfileLibraryArtistMainLink(
        {
          profileId: this.profileId,
          artistId: this.artistId
        }
      )
    },
    artistId () {
      return this.trackData.artist.id
    },
    profileLibraryAlbumMainLink () {
      return formatProfileLibraryAlbumMainLink(
        {
          profileId: this.profileId,
          albumId: this.albumId
        }
      )
    },
    albumId () {
      return this.trackData.album.id
    },
    trackMainLink () {
      return formatTrackMainLink(
        {
          trackTitle: this.trackTitle,
          artistName: this.artistName,
          sourceParams: this.sourceParams
        }
      )
    },
    trackTitle () {
      return this.trackData.title
    },
    artistName () {
      return this.trackData.artist.name
    },
    sourceParams () {
      return formatTrackRequestData(
        {
          sourceId: 'lastfm',
          trackData: this.trackData
        }
      )
    },
    trackFullTitle () {
      return [
        this.artistName,
        this.trackTitle
      ].join(
        ' - '
      )
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
    isSelf () {
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
      this.showDeleteModal()
    },
    handlePlaylistOptionClick () {
      this.showPlaylistsModal()
    },
    setFavoriteId (
      value
    ) {
      this.favoriteId = value
    },
    showDeleteModal () {
      this.$refs
        .deleteModal
        .show()
    },
    showPlaylistsModal () {
      this.$refs
        .playlistsModal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
