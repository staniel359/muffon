<template>
  <div
    ref="button"
    :data-content="popupTextFormatted"
  >
    <BaseLinkContainer
      :link="linkFormatted"
      @click="handleClick"
    >
      <BaseButton
        class="basic circular compact small library-link-button"
        icon="headphones primary"
      />
    </BaseLinkContainer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
import BaseButton from '@/BaseButton.vue'
import {
  main as formatProfileLibraryArtistMainLink
} from '#/formatters/links/profile/library/artist'
import {
  main as formatProfileLibraryAlbumMainLink
} from '#/formatters/links/profile/library/album'
import {
  main as formatProfileLibraryTrackMainLink
} from '#/formatters/links/profile/library/track'
import { setPopup } from '#/actions/plugins/semantic'
import { popupOptions } from '#/data/plugins/semantic'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'BaseLibrarySimpleButton',
  components: {
    BaseLinkContainer,
    BaseButton
  },
  props: {
    model: {
      type: String,
      required: true
    },
    modelId: {
      type: String,
      required: true
    }
  },
  emits: [
    'click'
  ],
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    linkFormatted () {
      switch (this.model) {
        case 'artist':
          return formatProfileLibraryArtistMainLink({
            profileId: this.profileId,
            artistId: this.modelId
          })
        case 'album':
          return formatProfileLibraryAlbumMainLink({
            profileId: this.profileId,
            albumId: this.modelId
          })
        case 'track':
          return formatProfileLibraryTrackMainLink({
            profileId: this.profileId,
            trackId: this.modelId
          })
        default:
          return {}
      }
    },
    profileId () {
      return this.profileInfo.id.toString()
    },
    popupTextFormatted () {
      return localize(
        'shared.library.show'
      )
    }
  },
  mounted () {
    setPopup(
      this.$refs.button,
      popupOptions()
    )
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="sass" scoped>
.library-link-button
  @extend .no-margin
</style>
