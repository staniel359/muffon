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
  artists as formatProfileLibraryArtistsLink,
  albums as formatProfileLibraryAlbumsLink,
  tracks as formatProfileLibraryTracksLink,
  tags as formatProfileLibraryTagsLink
} from '@/helpers/formatters/links/profile/library'

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
          return formatProfileLibraryArtistsLink(
            {
              profileId: this.profileId
            }
          )
        case 'albums':
          return formatProfileLibraryAlbumsLink(
            {
              profileId: this.profileId
            }
          )
        case 'tracks':
          return formatProfileLibraryTracksLink(
            {
              profileId: this.profileId
            }
          )
        case 'tags':
          return formatProfileLibraryTagsLink(
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
