<template>
  <BaseHeaderContainer
    class="main-artist-name"
    tag="h2"
  >
    <BaseLink
      :link="link"
      :text="artistName"
      @click="handleLinkClick"
    />
  </BaseHeaderContainer>
</template>

<script>
import BaseHeaderContainer
  from '@/components/containers/BaseHeaderContainer.vue'
import BaseLink from '@/components/links/BaseLink.vue'
import {
  main as formatArtistLink
} from '@/helpers/formatters/links/artist'

export default {
  name: 'HeaderSection',
  components: {
    BaseHeaderContainer,
    BaseLink
  },
  props: {
    artistData: {
      type: Object,
      required: true
    }
  },
  emits: [
    'linkClick'
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
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.main-artist-name
  font-size: 1.5rem !important
</style>
