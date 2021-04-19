<template>
  <h4 class="header">
    <RouterLink
      class="main-link"
      :to="trackMainLinkFormatted"
      @click.stop="handleClick"
    >
      {{ trackTitle }}
    </RouterLink>
  </h4>
</template>

<script>
import { trackMain as formatTrackMainLink } from '#/formatters/links'

export default {
  name: 'TrackTitle',
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
    'click'
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
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="sass" scoped></style>
