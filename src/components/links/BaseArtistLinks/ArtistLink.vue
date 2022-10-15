<template>
  <span v-if="index">, </span>

  <BaseLink
    ref="link"
    :link="link"
    :text="artistName"
    @active-change="handleLinkActiveChange"
    @click="handleLinkClick"
  />

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
import BaseLink from '@/components/links/BaseLink.vue'
import {
  main as formatArtistMainLink
} from '@/helpers/formatters/links/artist'
import artistPopupMixin from '@/mixins/artistPopupMixin'

export default {
  name: 'ArtistLink',
  components: {
    BaseLink
  },
  mixins: [
    artistPopupMixin
  ],
  props: {
    artistData: {
      type: Object,
      required: true
    },
    index: Number
  },
  emits: [
    'linkActiveChange',
    'linkClick'
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
