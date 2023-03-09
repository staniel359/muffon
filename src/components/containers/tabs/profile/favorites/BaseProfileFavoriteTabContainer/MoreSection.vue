<template>
  <div class="main-more-container">
    <strong>
      <BaseLink
        :link="moreLink"
        :text="moreText"
      />
    </strong>
  </div>
</template>

<script>
import BaseLink from '@/components/links/BaseLink.vue'
import {
  artists as formatProfileFavoritesArtistsLink,
  albums as formatProfileFavoritesAlbumsLink,
  tracks as formatProfileFavoritesTracksLink,
  videos as formatProfileFavoritesVideosLink
} from '@/helpers/formatters/links/profile/favorites'

export default {
  name: 'MoreSection',
  components: {
    BaseLink
  },
  props: {
    scope: {
      type: String,
      required: true
    },
    profileId: {
      type: String,
      required: true
    }
  },
  computed: {
    moreLink () {
      switch (this.scope) {
        case 'artists':
          return formatProfileFavoritesArtistsLink(
            {
              profileId: this.profileId
            }
          )
        case 'albums':
          return formatProfileFavoritesAlbumsLink(
            {
              profileId: this.profileId
            }
          )
        case 'tracks':
          return formatProfileFavoritesTracksLink(
            {
              profileId: this.profileId
            }
          )
        case 'videos':
          return formatProfileFavoritesVideosLink(
            {
              profileId: this.profileId
            }
          )
        default:
          return {}
      }
    },
    moreText () {
      return this.$t(
        'more'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
