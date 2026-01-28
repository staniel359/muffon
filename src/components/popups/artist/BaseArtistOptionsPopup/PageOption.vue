<template>
  <BaseLinkOption
    icon="artist"
    :link="link"
    :text="pageText"
    @click="handleClick"
  />
</template>

<script>
import BaseLinkOption from '@/components/popups/options/BaseLinkOption.vue'
import {
  main as formatArtistLink
} from '@/helpers/formatters/links/artist'

export default {
  name: 'PageOption',
  components: {
    BaseLinkOption
  },
  inject: [
    'hidePopup'
  ],
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
      return formatArtistLink(
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
        'actions.goTo.page'
      )
    }
  },
  methods: {
    handleClick () {
      this.hidePopup()

      this.$emit(
        'click'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
