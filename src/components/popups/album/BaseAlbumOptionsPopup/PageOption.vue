<template>
  <BaseLinkOption
    icon="album"
    :link="link"
    :text="pageText"
    @click="handleClick"
  />
</template>

<script>
import BaseLinkOption from '@/components/popups/options/BaseLinkOption.vue'
import {
  main as formatAlbumMainLink
} from '@/helpers/formatters/links/album'

export default {
  name: 'PageOption',
  components: {
    BaseLinkOption
  },
  props: {
    albumData: {
      type: Object,
      required: true
    }
  },
  emits: [
    'click'
  ],
  computed: {
    link () {
      return formatAlbumMainLink(
        {
          artistName: this.artistName,
          albumTitle: this.albumTitle
        }
      )
    },
    artistName () {
      return this.albumData.artist.name
    },
    albumTitle () {
      return this.albumData.title
    },
    pageText () {
      return this.$t(
        'actions.show.page'
      )
    }
  },
  methods: {
    handleClick () {
      this.$emit(
        'click'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
