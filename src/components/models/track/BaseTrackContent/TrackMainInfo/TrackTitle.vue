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
import { trackMain as formatTrackMainLink } from '#/formatters/links'

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
    artistName: {
      type: String,
      required: true
    },
    trackExtraTitle: String
  },
  emits: [
    'linkClick'
  ],
  computed: {
    trackMainLinkFormatted () {
      return formatTrackMainLink({
        trackTitle: this.trackTitle,
        artistName: this.artistName
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

<style lang="sass" scoped>
.description
  @extend .text-medium-light
</style>
