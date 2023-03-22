<template>
  <BaseLinkOption
    icon="track"
    :link="link"
    :text="pageText"
    @click="handleClick"
  />
</template>

<script>
import BaseLinkOption from '@/components/popups/options/BaseLinkOption.vue'
import {
  main as formatTrackMainLink
} from '@/helpers/formatters/links/track'
import formatRequestTrackData from '@/helpers/formatters/request/track/data'

export default {
  name: 'PageOption',
  components: {
    BaseLinkOption
  },
  props: {
    trackData: {
      type: Object,
      required: true
    }
  },
  emits: [
    'click'
  ],
  computed: {
    link () {
      return formatTrackMainLink(
        {
          artistName: this.artistName,
          trackTitle: this.trackTitle,
          sourceParams: this.sourceParams
        }
      )
    },
    artistName () {
      return this.trackData.artist.name
    },
    trackTitle () {
      return this.trackData.title
    },
    pageText () {
      return this.$t(
        'actions.show.page'
      )
    },
    sourceParams () {
      return formatRequestTrackData(
        {
          trackData: this.trackData,
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
