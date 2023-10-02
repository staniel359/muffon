<template>
  <BaseLinkContainer
    class="item main-simple-list-item middle-aligned"
    :link="link"
    @click="handleLinkClick"
  >
    <BaseImage
      class="rounded-medium image-35"
      model="track"
      :image="imageData?.extrasmall"
    />

    <div class="content">
      <BaseHeader
        tag="h4"
        :class="{
          link: isMainLinkActive
        }"
        :text="trackTitle"
      />

      <div class="extra">
        <BaseArtistLinks
          :artists="artists"
          @link-click="handleLinkClick"
          @link-active-change="handleArtistLinkActiveChange"
        />
      </div>
    </div>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseImage from '@/components/images/BaseImage.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseArtistLinks from '@/components/links/BaseArtistLinks.vue'
import {
  lyrics as formatTrackLyricsLink
} from '@/helpers/formatters/links/track'

export default {
  name: 'LyricsItem',
  components: {
    BaseLinkContainer,
    BaseImage,
    BaseHeader,
    BaseArtistLinks
  },
  props: {
    lyricsData: {
      type: Object,
      required: true
    }
  },
  emits: [
    'linkClick'
  ],
  data () {
    return {
      isMainLinkActive: true
    }
  },
  computed: {
    link () {
      return formatTrackLyricsLink(
        {
          artistName: this.artistName,
          trackTitle: this.trackTitle,
          sourceParams: this.sourceParams
        }
      )
    },
    artistName () {
      return this.lyricsData.artist.name
    },
    trackTitle () {
      return this.lyricsData.title
    },
    sourceParams () {
      return {
        source: this.source,
        trackId: this.trackId
      }
    },
    source () {
      return this.lyricsData.source.name
    },
    trackId () {
      return this.lyricsData.source.id
    },
    imageData () {
      return this.lyricsData.image
    },
    artists () {
      return this.lyricsData.artists
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    handleArtistLinkActiveChange (
      value
    ) {
      this.isMainLinkActive = !value
    }
  }
}
</script>

<style lang="sass" scoped></style>
