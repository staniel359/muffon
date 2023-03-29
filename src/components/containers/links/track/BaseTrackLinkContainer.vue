<template>
  <BaseLinkContainer
    :link="link"
    @click="handleLinkClick"
  >
    <slot />
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import {
  main as formatProfileLibraryTrackLink
} from '@/helpers/formatters/links/profile/library/track'
import {
  main as formatTrackLink
} from '@/helpers/formatters/links/track'
import formatRequestTrackData from '@/helpers/formatters/request/track/data'

export default {
  name: 'BaseTrackLinkContainer',
  components: {
    BaseLinkContainer
  },
  props: {
    trackData: {
      type: Object,
      required: true
    },
    artistName: String,
    isLinkToLibrary: Boolean,
    profileId: String,
    libraryTrackId: String
  },
  emits: [
    'linkClick'
  ],
  computed: {
    link () {
      if (this.isLinkToLibrary) {
        return this.profileLibraryTrackLink
      } else {
        return this.trackLink
      }
    },
    profileLibraryTrackLink () {
      return formatProfileLibraryTrackLink(
        {
          profileId: this.profileId,
          libraryTrackId:
            this.libraryTrackIdComputed
        }
      )
    },
    libraryTrackIdComputed () {
      return (
        this.trackData.library?.id ||
          this.libraryTrackId
      )
    },
    trackLink () {
      return formatTrackLink(
        {
          trackTitle: this.trackTitle,
          artistName:
            this.artistNameComputed,
          sourceParams: this.sourceParams
        }
      )
    },
    trackTitle () {
      return this.trackData.title
    },
    artistNameComputed () {
      return (
        this.trackData.artist?.name ||
          this.artistName
      )
    },
    sourceParams () {
      return formatRequestTrackData(
        {
          trackData: this.trackData,
          artistName:
            this.artistNameComputed
        }
      )
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
