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

export default {
  name: 'TrackTitle',
  components: {
    BaseHeaderContainer,
    BaseLink
  },
  props: {
    trackTitle: {
      type: String,
      required: true
    },
    artistName: String,
    trackExtraTitle: String,
    isLinkToLibrary: Boolean,
    profileId: String,
    trackId: String
  },
  emits: [
    'linkClick'
  ],
  computed: {
    trackMainLinkFormatted () {
      if (this.isLinkToLibrary) {
        return formatProfileLibraryTrackMainLink({
          profileId: this.profileId,
          trackId: this.trackId
        })
      } else {
        return formatTrackMainLink({
          trackTitle: this.trackTitle,
          artistName: this.artistName
        })
      }
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
