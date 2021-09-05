<template>
  <BaseLinkContainer
    :link="linkFormatted"
    @click="handleLinkClick"
  >
    <BaseSimpleCardContainer>
      <div class="main-simple-card-image-container">
        <BaseArtistImage
          class="circular bordered"
          :image="image"
          :artistName="artistName"
          @loadEnd="handleImageLoadEnd"
        />
      </div>

      <div class="content">
        <BaseHeader
          :class="{ link: isHeaderLink }"
          tag="h4"
          :text="artistName"
        />

        <BaseArtistListenersCount
          v-if="isWithListenersCount"
          class="description"
          :artistName="artistName"
          :listenersCount="listenersCount"
          @loadEnd="handleListenersCountLoadEnd"
        />

        <LibraryCountersSection
          v-if="isWithTracksCount || isWithAlbumsCount"
          :artistData="artistData"
          :isWithTracksCount="isWithTracksCount"
          :isWithAlbumsCount="isWithAlbumsCount"
          @tracksLinkActiveChange="handleTracksLinkActiveChange"
          @albumsLinkActiveChange="handleAlbumsLinkActiveChange"
        />

        <BaseSelfSimpleButtons
          model="artist"
          :modelData="artistData"
          :isWithLibraryLink="isWithLibraryLink"
          :isWithListenedButton="isWithListenedButton"
          :isWithBookmarkButton="isWithBookmarkButton"
        />
      </div>
    </BaseSimpleCardContainer>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
import BaseSimpleCardContainer from '@/containers/BaseSimpleCardContainer.vue'
import BaseArtistImage from '@/models/artist/BaseArtistImage.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseArtistListenersCount
  from '@/models/artist/BaseArtistListenersCount.vue'
import LibraryCountersSection from './ArtistItem/LibraryCountersSection.vue'
import BaseSelfSimpleButtons from '@/models/self/BaseSelfSimpleButtons.vue'
import { main as formatArtistMainLink } from '#/formatters/links/artist'
import {
  main as formatProfileLibraryArtistMainLink,
  tracks as formatProfileLibraryArtistTracksLink,
  albums as formatProfileLibraryArtistAlbumsLink
} from '#/formatters/links/profile/library/artist'

export default {
  name: 'ArtistItem',
  components: {
    BaseLinkContainer,
    BaseSimpleCardContainer,
    BaseArtistImage,
    BaseHeader,
    BaseArtistListenersCount,
    LibraryCountersSection,
    BaseSelfSimpleButtons
  },
  inject: [
    'findPaginationItem'
  ],
  props: {
    artistData: {
      type: Object,
      required: true
    },
    isWithListenersCount: Boolean,
    isWithTracksCount: Boolean,
    isWithAlbumsCount: Boolean,
    isWithLibrary: Boolean,
    isLinkToLibrary: Boolean,
    profileId: String,
    isWithLibraryLink: Boolean,
    isWithListenedButton: Boolean,
    isWithBookmarkButton: Boolean
  },
  emits: [
    'linkClick'
  ],
  data () {
    return {
      isTracksLinkActive: false,
      isAlbumsLinkActive: false
    }
  },
  computed: {
    linkFormatted () {
      if (this.isLinkToLibrary) {
        if (this.isTracksLinkActive) {
          return formatProfileLibraryArtistTracksLink({
            profileId: this.profileId,
            artistId: this.artistId
          })
        } else if (this.isAlbumsLinkActive) {
          return formatProfileLibraryArtistAlbumsLink({
            profileId: this.profileId,
            artistId: this.artistId
          })
        } else {
          return formatProfileLibraryArtistMainLink({
            profileId: this.profileId,
            artistId: this.artistId
          })
        }
      } else {
        return formatArtistMainLink({
          artistName: this.artistName
        })
      }
    },
    artistId () {
      return this.artistData.id
    },
    artistName () {
      return this.artistData.name
    },
    image () {
      return this.artistData.image
    },
    listenersCount () {
      return this.artistData.listeners_count
    },
    uuid () {
      return this.artistData.uuid
    },
    isHeaderLink () {
      return (
        !this.isTracksLinkActive &&
          !this.isAlbumsLinkActive
      )
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit('linkClick')
    },
    handleImageLoadEnd (value) {
      this.findPaginationItem({
        uuid: this.uuid
      }).image = value
    },
    handleListenersCountLoadEnd (value) {
      this.findPaginationItem({
        uuid: this.uuid
      }).listeners_count = value
    },
    handleTracksLinkActiveChange (value) {
      this.isTracksLinkActive = value
    },
    handleAlbumsLinkActiveChange (value) {
      this.isAlbumsLinkActive = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
