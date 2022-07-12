<template>
  <BaseButton
    class="basic compact circular small more-link-button"
    icon="ellipsis horizontal"
    :class="buttonClass"
    @click="handleClick"
  />
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseButton from '*/components/buttons/BaseButton.vue'
import {
  images as formatArtistImagesLink
} from '*/helpers/formatters/links/artist'

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
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    ),
    artistImagesLink () {
      return formatArtistImagesLink(
        {
          artistName: this.artistName
        }
      )
    },
    buttonClass () {
      return this.isDarkMode ? 'black' : 'white'
    }
  },
  methods: {
    handleClick () {
      this.$router.push(
        this.artistImagesLink
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.more-link-button
  @extend .absolute
  bottom: 10px
  right: 10px
  z-index: 1
</style>
