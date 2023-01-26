<template>
  <BaseLinkOption
    icon="track"
    :link="link"
    :text="pageText"
    @click="handleClick"
  />
</template>

<script>
import BaseLinkOption from '@/components/dropdowns/options/BaseLinkOption.vue'
import {
  main as formatTrackMainLink
} from '@/helpers/formatters/links/track'

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
          trackTitle: this.trackTitle
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
