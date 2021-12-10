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
          model="album"
          :albumTitle="albumTitle"
          :artistName="artistName"
          :favoriteId="favoriteId"
          isWithFavoriteOption
          isWithDeleteOption
          @delete="handleDeleteOptionClick"
        />
      </div>

      <BaseProfileLibraryDeleteModal
        ref="deleteModal"
        model="album"
        :profileId="profileId"
        :modelId="albumId"
        :modelTitle="albumFullTitle"
        isDeleteWithRedirect
      />
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
import BaseDivider from '@/BaseDivider.vue'
import BaseOptionsDropdown from '@/dropdowns/BaseOptionsDropdown.vue'
import BaseProfileLibraryDeleteModal
  from '@/modals/profile/library/BaseProfileLibraryDeleteModal.vue'
import {
  main as formatProfileLibraryArtistMainLink
} from '#/formatters/links/profile/library/artist'
import { main as formatAlbumMainLink } from '#/formatters/links/album'
import { isCurrentProfile } from '#/utils'
import { date as formatDate } from '#/formatters'
import formatAlbumSourceParams
  from '#/actions/api/album/formatters/requestData'

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
    albumMainLinkFormatted () {
      if (this.isArtistNameActive) {
        return formatProfileLibraryArtistMainLink({
          profileId: this.profileId,
          artistId: this.artistId
        })
      } else {
        return formatAlbumMainLink({
          albumTitle: this.albumTitle,
          artistName: this.artistName,
          sourceParams: this.sourceParams
        })
      }
    },
    sourceParams () {
      return formatAlbumSourceParams({
        sourceId: 'lastfm',
        albumData: this.albumData,
        artistName: this.artistName
      })
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

<style lang="sass" scoped>
.main-self-icons
  margin-top: 0.25em
</style>
