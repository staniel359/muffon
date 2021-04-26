<template>
  <div class="description">
    <BaseLink
      :link="albumMainLinkFormatted"
      :text="albumTitle"
      @click.stop="handleLinkClick"
    />
  </div>
</template>

<script>
import BaseLink from '@/BaseLink.vue'
import { albumMain as formatAlbumMainLink } from '#/formatters/links'

export default {
  name: 'TrackAlbumTitle',
  components: {
    BaseLink
  },
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
    'linkClick'
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
    handleLinkClick () {
      this.$emit('linkClick')
    }
  }
}
</script>

<style lang="sass" scoped></style>
