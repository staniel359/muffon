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
          model="album"
          size="small"
          :image="imageData?.medium"
        />

        <BaseHeader
          tag="h3"
          :class="{
            link: !isArtistNameActive
          }"
          :text="albumTitle"
        />

        <div
          :class="{
            link: isArtistNameActive
          }"
          @mouseenter="handleArtistLinkMouseEnter"
          @mouseleave="handleArtistLinkMouseLeave"
          v-text="artistName"
        />
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
            model="album"
            :album-title="albumTitle"
            :artist-name="artistName"
            :favorite-id="favoriteId"
            is-with-favorite-option
            is-with-delete-option
            @delete-option-click="handleDeleteOptionClick"
          />

          <BaseProfileLibraryDeleteModal
            ref="deleteModal"
            model="album"
            :profile-id="profileId"
            :model-id="albumId"
            :model-name="albumFullTitle"
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
import BaseProfileLibraryDeleteModal
  from '*/components/modals/profile/library/BaseProfileLibraryDeleteModal.vue'
import BaseDivider from '*/components/BaseDivider.vue'
import {
  main as formatProfileLibraryArtistMainLink
} from '*/helpers/formatters/links/profile/library/artist'
import {
  main as formatAlbumMainLink
} from '*/helpers/formatters/links/album'
import {
  isCurrentProfile
} from '*/helpers/utils'
import {
  date as formatDate
} from '*/helpers/formatters'
import formatAlbumRequestData from '*/helpers/formatters/request/album/data'

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
    albumData: Object,
    albumId: String
  },
  data () {
    return {
      favoriteId: null,
      isArtistNameActive: false
    }
  },
  computed: {
    link () {
      if (this.isArtistNameActive) {
        return this.profileLibraryArtistMainLink
      } else {
        return this.albumMainLink
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
      return this.albumData.artist.id
    },
    albumMainLink () {
      return formatAlbumMainLink(
        {
          albumTitle: this.albumTitle,
          artistName: this.artistName,
          sourceParams: this.sourceParams
        }
      )
    },
    albumTitle () {
      return this.albumData.title
    },
    artistName () {
      return this.albumData.artist.name
    },
    sourceParams () {
      return formatAlbumRequestData(
        {
          sourceId: 'lastfm',
          albumData: this.albumData
        }
      )
    },
    albumFullTitle () {
      return [
        this.artistName,
        this.albumTitle
      ].join(
        ' - '
      )
    },
    imageData () {
      return this.albumData.image
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
      return this.albumData.created
    },
    isSelf () {
      return isCurrentProfile(
        this.profileId
      )
    }
  },
  mounted () {
    this.favoriteId =
      this.albumData.favorite_id?.toString()
  },
  methods: {
    handleArtistLinkMouseEnter () {
      this.isArtistNameActive = true
    },
    handleArtistLinkMouseLeave () {
      this.isArtistNameActive = false
    },
    handleDeleteOptionClick () {
      this.showDeleteModal()
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
