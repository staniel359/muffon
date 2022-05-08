<template>
  <span v-if="index">, </span>

  <BaseLink
    :link="link"
    :text="artistName"
    @click="handleClick"
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
    handleClick () {
      this.$emit(
        'linkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
