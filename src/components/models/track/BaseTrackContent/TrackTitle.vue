<template>
  <BaseHeaderContainer
    tag="h4"
  >
    <BaseLink
      :link="link"
      :text="trackTitle"
      @click="handleLinkClick"
    />

    <span
      v-if="trackExtraTitle"
      :class="[
        'sub header description',
        'main-extra-title'
      ]"
      v-text="trackExtraTitle"
    />
  </BaseHeaderContainer>
</template>

<script>
import BaseHeaderContainer
  from '*/components/containers/BaseHeaderContainer.vue'
import BaseLink from '*/components/links/BaseLink.vue'
import {
  main as formatTrackMainLink
} from '*/helpers/formatters/links/track'
import {
  main as formatProfileLibraryTrackMainLink
} from '*/helpers/formatters/links/profile/library/track'
import formatTrackRequestData from '*/helpers/formatters/request/track/data'

export default {
  name: 'TrackTitle',
  components: {
    BaseHeaderContainer,
    BaseLink
  },
  props: {
    trackData: {
      type: Object,
      required: true
    },
    artistName: String,
    isLinkToLibrary: Boolean,
    profileId: String
  },
  emits: [
    'linkClick'
  ],
  computed: {
    trackTitle () {
      return this.trackData.title
    },
    trackExtraTitle () {
      return this.trackData.extra_title
    },
    link () {
      if (this.isLinkToLibrary) {
        return this.profileLibraryTrackMainLink
      } else {
        return this.trackMainLink
      }
    },
    profileLibraryTrackMainLink () {
      return formatProfileLibraryTrackMainLink(
        {
          profileId: this.profileId,
          libraryTrackId: this.libraryTrackId
        }
      )
    },
    libraryTrackId () {
      return this.trackData.library.id
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
    sourceParams () {
      return formatTrackRequestData(
        {
          sourceId: this.trackData.source_id,
          trackData: this.trackData
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
