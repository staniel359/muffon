<template>
  <BaseLinkOption
    icon="artist"
    :link="link"
    :text="pageText"
    @click="handleClick"
  />
</template>

<script>
import BaseLinkOption from '@/components/dropdowns/options/BaseLinkOption.vue'
import {
  main as formatArtistMainLink
} from '@/helpers/formatters/links/artist'

export default {
  name: 'PageOption',
  components: {
    BaseLinkOption
  },
  props: {
    artistData: {
      type: Object,
      required: true
    }
  },
  emits: [
    'click'
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
