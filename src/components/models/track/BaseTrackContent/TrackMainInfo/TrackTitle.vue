<template>
  <h4 class="header">
    <BaseLink
      :link="trackMainLinkFormatted"
      :text="trackTitle"
      @click.stop="handleLinkClick"
    />
  </h4>
</template>

<script>
import BaseLink from '@/BaseLink.vue'
import { trackMain as formatTrackMainLink } from '#/formatters/links'

export default {
  name: 'TrackTitle',
  components: {
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
    }
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

<style lang="sass" scoped></style>
