<template>
  <BaseHeaderContainer tag="h4">
    <BaseLink
      :link="trackMainLinkFormatted"
      :text="trackTitle"
      @click="handleLinkClick"
    />

    <span
      v-if="trackExtraTitle"
      class="sub header description main-extra-title"
    >
      {{ &nbsp; }}
      {{ trackExtraTitle }}
    </span>
  </BaseHeaderContainer>
</template>

<script>
import BaseHeaderContainer from '@/containers/BaseHeaderContainer.vue'
import BaseLink from '@/BaseLink.vue'
import { main as formatTrackMainLink } from '#/formatters/links/track'
import {
  main as formatProfileLibraryTrackMainLink
} from '#/formatters/links/profile/library/track'
import formatTrackSourceParams
  from '#/actions/api/track/formatters/requestData'

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
    profileId: String,
    trackId: String
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
    trackMainLinkFormatted () {
      if (this.isLinkToLibrary) {
        return formatProfileLibraryTrackMainLink({
          profileId: this.profileId,
          trackId: this.trackId
        })
      } else {
        return formatTrackMainLink({
          trackTitle: this.trackTitle,
          artistName: this.artistName,
          sourceParams: this.sourceParams
        })
      }
    },
    sourceParams () {
      return formatTrackSourceParams({
        sourceId: this.trackData.source_id,
        trackData: this.trackData
      })
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit('linkClick')
    }
  }
}
</script>

<style lang="sass" scoped></style>
