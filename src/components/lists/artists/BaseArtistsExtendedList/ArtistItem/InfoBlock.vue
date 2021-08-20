<template>
  <div class="artist-info-data">
    <BaseHeaderContainer
      class="main-artist-name"
      tag="h2"
    >
      <BaseLink
        :link="artistMainLinkFormatted"
        :text="artistName"
      />
    </BaseHeaderContainer>

    <BaseCounters
      :listenersCount="listenersCount"
      :playsCount="playsCount"
    />

    <BaseArtistTags
      v-if="tags.length"
      :tags="tags"
      :artistName="artistName"
      :isMore="isMoreTags"
    />

    <template v-if="description">
      <BaseDivider />

      <BaseArtistDescription
        :description="description"
        :artistName="artistName"
        :isMore="isMoreDescription"
      />
    </template>
  </div>
</template>

<script>
import BaseHeaderContainer from '@/containers/BaseHeaderContainer.vue'
import BaseLink from '@/BaseLink.vue'
import BaseCounters from '@/BaseCounters.vue'
import BaseArtistTags from '@/models/artist/BaseArtistTags.vue'
import BaseDivider from '@/BaseDivider.vue'
import BaseArtistDescription from '@/models/artist/BaseArtistDescription.vue'
import { main as formatArtistMainLink } from '#/formatters/links/artist'
import {
  main as formatProfileLibraryArtistMainLink
} from '#/formatters/links/profile/library/artist'

export default {
  name: 'InfoBlock',
  components: {
    BaseHeaderContainer,
    BaseLink,
    BaseCounters,
    BaseArtistTags,
    BaseDivider,
    BaseArtistDescription
  },
  props: {
    artistData: {
      type: Object,
      required: true
    },
    isLinkToLibrary: Boolean,
    profileId: String,
    artistId: String
  },
  computed: {
    artistMainLinkFormatted () {
      if (this.isLinkToLibrary) {
        return formatProfileLibraryArtistMainLink({
          profileId: this.profileId,
          artistId: this.artistId
        })
      } else {
        return formatArtistMainLink({
          artistName: this.artistName
        })
      }
    },
    artistName () {
      return this.artistData.name
    },
    listenersCount () {
      return this.artistData.listeners_count
    },
    playsCount () {
      return this.artistData.plays_count
    },
    tags () {
      return this.artistData.tags
    },
    isMoreTags () {
      return this.artistData.with_more.tags
    },
    description () {
      return this.artistData.description
    },
    isMoreDescription () {
      return this.artistData.with_more.description
    }
  }
}
</script>

<style lang="sass" scoped>
.artist-info-data
  @extend .flex-full
</style>
