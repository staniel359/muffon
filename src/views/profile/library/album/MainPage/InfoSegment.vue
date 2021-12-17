<template>
  <div class="ui raised segments main-segment-container">
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
            model="album"
            :albumTitle="albumTitle"
            :artistName="artistName"
            :favoriteId="favoriteId"
            isWithFavoriteOption
            isWithDeleteOption
            @delete="handleDeleteOptionClick"
          />

          <BaseProfileLibraryDeleteModal
            ref="deleteModal"
            model="album"
            :profileId="profileId"
            :modelId="albumId"
            :modelTitle="albumFullTitle"
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
import BaseProfileLibraryDeleteModal
  from '@/modals/profile/library/BaseProfileLibraryDeleteModal.vue'
import BaseDivider from '@/BaseDivider.vue'
import {
  main as formatProfileLibraryArtistMainLink
} from '#/formatters/links/profile/library/artist'
import { main as formatAlbumMainLink } from '#/formatters/links/album'
import { isCurrentProfile } from '#/utils'
import { date as formatDate } from '#/formatters'
import formatAlbumRequestData from '#/formatters/request/album/requestData'

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
    albumData: Object,
    profileId: String,
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
      return formatProfileLibraryArtistMainLink({
        profileId: this.profileId,
        artistId: this.artistId
      })
    },
    artistId () {
      return this.albumData.artist.id
    },
    albumMainLink () {
      return formatAlbumMainLink({
        albumTitle: this.albumTitle,
        artistName: this.artistName,
        sourceParams: this.sourceParams
      })
    },
    albumTitle () {
      return this.albumData.title
    },
    artistName () {
      return this.albumData.artist.name
    },
    sourceParams () {
      return formatAlbumRequestData({
        sourceId: 'lastfm',
        albumData: this.albumData,
        artistName: this.artistName
      })
    },
    albumFullTitle () {
      return `${this.artistName} - ${this.albumTitle}`
    },
    imageData () {
      return this.albumData.image
    },
    sinceText () {
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
      return this.albumData.created
    },
    isRenderOptions () {
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
      this.$refs.deleteModal.show()
    },
    setFavoriteId (value) {
      this.favoriteId = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
