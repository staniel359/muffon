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
  main as formatAlbumLink
} from '@/helpers/formatters/links/album'
import formatRequestAlbumData from '@/helpers/formatters/request/album/data'

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
      return formatAlbumLink(
        {
          artistName: this.artistName,
          albumTitle: this.albumTitle,
          sourceParams: this.sourceParams
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
    },
    sourceParams () {
      return formatRequestAlbumData(
        {
          albumData: this.albumData,
          artistName: this.artistName
        }
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
