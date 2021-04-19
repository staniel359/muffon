<template>
  <div class="description">
    <RouterLink
      class="main-link"
      :to="albumMainLinkFormatted"
      @click.stop="handleClick"
    >
      {{ albumTitle }}
    </RouterLink>
  </div>
</template>

<script>
import { albumMain as formatAlbumMainLink } from '#/formatters/links'

export default {
  name: 'TrackAlbumTitle',
  props: {
    albumTitle: {
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
    albumMainLinkFormatted () {
      return formatAlbumMainLink({
        albumTitle: this.albumTitle,
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
