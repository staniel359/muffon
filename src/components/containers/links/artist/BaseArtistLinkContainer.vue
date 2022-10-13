<template>
  <BaseLinkContainer
    ref="link"
    v-bind="$attrs"
    :link="link"
    @active-change="handleLinkActiveChange"
    @click="handleLinkClick"
  >
    <slot />
  </BaseLinkContainer>

  <BaseArtistPopup
    v-if="isWithPopup"
    ref="popup"
    :is-called="isCalled"
    :is-visible="isVisible"
    :artist-name="artistName"
    @artist-data-change="handleArtistDataChange"
    @link-click="handlePopupLinkClick"
  />
</template>

<script>
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import {
  main as formatProfileLibraryArtistMainLink
} from '@/helpers/formatters/links/profile/library/artist'
import {
  main as formatArtistMainLink
} from '@/helpers/formatters/links/artist'
import artistPopupMixin from '@/mixins/artistPopupMixin'

export default {
  name: 'BaseArtistLinkContainer',
  components: {
    BaseLinkContainer
  },
  mixins: [
    artistPopupMixin
  ],
  props: {
    artistData: {
      type: Object,
      required: true
    },
    isLinkToLibrary: Boolean,
    profileId: String,
    libraryArtistId: String
  },
  emits: [
    'linkActiveChange',
    'linkClick'
  ],
  computed: {
    link () {
      if (this.isLinkToLibrary) {
        return this.profileLibraryArtistMainLink
      } else {
        return this.artistMainLink
      }
    },
    profileLibraryArtistMainLink () {
      return formatProfileLibraryArtistMainLink(
        {
          profileId: this.profileId,
          libraryArtistId:
            this.libraryArtistIdComputed
        }
      )
    },
    libraryArtistIdComputed () {
      return (
        this.artistData.library?.id ||
          this.libraryArtistId
      )
    },
    artistMainLink () {
      return formatArtistMainLink(
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
    handleLinkActiveChange (
      value
    ) {
      this.$emit(
        'linkActiveChange',
        value
      )
    },
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
