<template>
  <span v-if="index">, </span>

  <BaseLink
    :link="link"
    :text="artistName"
    @active-change="handleLinkActiveChange"
    @click="handleLinkClick"
  />
</template>

<script>
import BaseLink from '*/components/links/BaseLink.vue'
import {
  main as formatArtistMainLink
} from '*/helpers/formatters/links/artist'

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
    index: Number
  },
  emits: [
    'linkActiveChange',
    'linkClick'
  ],
  computed: {
    link () {
      return formatArtistMainLink(
        {
          artistName: this.artistName
        }
      )
    },
    artistName () {
      return this.artistData.name
    }
  },
  methods: {
    handleLinkActiveChange (
      value
    ) {
      this.$emit(
        'linkActiveChange',
        value
      )
    },
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
