<template>
  <RouterLink
    class="main-link"
    :to="artistMainLinkFormatted"
    @click.stop="handleClick"
  >
    {{ artistName }}
  </RouterLink>
</template>

<script>
import { artistMain as formatArtistMainLink } from '#/formatters/links'

export default {
  name: 'TrackArtistName',
  props: {
    artistName: {
      type: String,
      required: true
    }
  },
  emits: [
    'click'
  ],
  computed: {
    artistMainLinkFormatted () {
      return formatArtistMainLink({
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
