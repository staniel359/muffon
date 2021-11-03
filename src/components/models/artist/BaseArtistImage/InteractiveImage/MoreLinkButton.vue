<template>
  <BaseButton
    class="basic compact circular small more-link-button"
    icon="ellipsis horizontal"
    :class="{ white: !isDarkMode }"
    @click="handleClick"
  />
</template>

<script>
import { mapState } from 'vuex'
import BaseButton from '@/BaseButton.vue'
import { images as formatArtistImagesLink } from '#/formatters/links/artist'

export default {
  name: 'MoreLinkButton',
  components: {
    BaseButton
  },
  props: {
    artistName: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ]),
    artistImagesLinkFormatted () {
      return formatArtistImagesLink({
        artistName: this.artistName
      })
    }
  },
  methods: {
    handleClick () {
      this.$router.push(
        this.artistImagesLinkFormatted
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.more-link-button
  @extend .no-margin, .absolute
  bottom: 10px
  right: 10px
  z-index: 1
</style>
