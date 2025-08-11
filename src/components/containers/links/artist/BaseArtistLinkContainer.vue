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

  <div
    v-if="isWithPopup"
    class="main-popup-container"
  >
    <BaseArtistPopup
      ref="popup"
      :is-called="isCalled"
      :is-visible="isVisible"
      :artist-name="artistName"
      @artist-data-change="handleArtistDataChange"
      @link-click="handlePopupLinkClick"
    />
  </div>
</template>

<script>
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import {
  main as formatProfileLibraryArtistLink
} from '@/helpers/formatters/links/profile/library/artist'
import {
  main as formatArtistLink
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
    profileId: Number,
    libraryArtistId: Number
  },
  emits: [
    'linkActiveChange',
    'linkClick'
  ],
  computed: {
    link () {
      if (this.isLinkToLibrary) {
        return this.profileLibraryArtistLink
      } else {
        return this.artistLink
      }
    },
    profileLibraryArtistLink () {
      return formatProfileLibraryArtistLink(
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
    artistLink () {
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
