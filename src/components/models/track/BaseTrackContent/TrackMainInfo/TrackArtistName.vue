<template>
  <BaseLink
    :link="artistMainLinkFormatted"
    :text="artistName"
    @click.stop="handleLinkClick"
  />
</template>

<script>
import BaseLink from '@/BaseLink.vue'
import { artistMain as formatArtistMainLink } from '#/formatters/links'

export default {
  name: 'TrackArtistName',
  components: {
    BaseLink
  },
  props: {
    artistName: {
      type: String,
      required: true
    }
  },
  emits: [
    'linkClick'
  ],
  computed: {
    artistMainLinkFormatted () {
      return formatArtistMainLink({
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
