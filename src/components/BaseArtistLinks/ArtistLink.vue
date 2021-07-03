<template>
  <span v-if="index">, </span>

  <BaseLink
    :link="artistMainLinkFormatted"
    :text="artistName"
    @click="handleClick"
  />
</template>

<script>
import BaseLink from '@/BaseLink.vue'
import { artistMain as formatArtistMainLink } from '#/formatters/links'

export default {
  name: 'ArtistLink',
  components: {
    BaseLink
  },
  props: {
    artistData: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
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
    },
    artistName () {
      return this.artistData.name
    }
  },
  methods: {
    handleClick () {
      this.$emit('linkClick')
    }
  }
}
</script>

<style lang="sass" scoped></style>
