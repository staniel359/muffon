<template>
  <BaseLinkContainer
    class="item main-simple-list-item"
    :class="{
      disabled: isDisabled
    }"
    :link="linkFormatted"
    @click="handleLinkClick"
  >
    <BaseBookmarkDeletedBlock
      v-if="isBookmarkDeleted"
    />
    <template v-else>
      <BaseImage
        class="rounded bordered"
        :image="image"
      />

      <InfoBlock
        :albumTitle="albumTitle"
        :artistName="artistName"
        :listenersCount="listenersCount"
        :uuid="uuid"
        :isWithArtistName="isWithArtistName"
        :isArtistNameActive="isArtistNameActive"
        :isWithListenersCount="isWithListenersCount"
      />

      <BaseSelfSimpleButtons
        model="album"
        :modelData="albumData"
        :isWithLibraryLink="isWithLibraryLink"
        :isWithListenedButton="isWithListenedButton"
        :isWithBookmarkButton="isWithBookmarkButton"
      />

      <BaseBookmarkDeleteButton
        v-if="isBookmark"
        model="album"
        :modelData="albumData"
        @deleted="handleBookmarkDeleted"
      />

      <BaseClearButton
        v-if="isWithClearButton"
        class="delete-button"
        @click="handleDeleteButtonClick"
      />
    </template>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
import BaseBookmarkDeletedBlock from '@/BaseBookmarkDeletedBlock.vue'
import BaseImage from '@/BaseImage.vue'
import InfoBlock from './AlbumItem/InfoBlock.vue'
import BaseSelfSimpleButtons from '@/models/self/BaseSelfSimpleButtons.vue'
import BaseBookmarkDeleteButton from '@/BaseBookmarkDeleteButton.vue'
import BaseClearButton from '@/BaseClearButton.vue'
import { main as formatArtistMainLink } from '#/formatters/links/artist'
import { main as formatAlbumMainLink } from '#/formatters/links/album'

export default {
  name: 'AlbumItem',
  components: {
    BaseLinkContainer,
    BaseBookmarkDeletedBlock,
    BaseImage,
    InfoBlock,
    BaseSelfSimpleButtons,
    BaseBookmarkDeleteButton,
    BaseClearButton
  },
  provide () {
    return {
      setIsArtistNameActive: this.setIsArtistNameActive
    }
  },
  props: {
    albumData: {
      type: Object,
      required: true
    },
    isWithArtistName: Boolean,
    isWithListenersCount: Boolean,
    isWithLibraryLink: Boolean,
    isWithClearButton: Boolean,
    isWithListenedButton: Boolean,
    isWithBookmarkButton: Boolean,
    isBookmark: Boolean
  },
  emits: [
    'linkClick',
    'deleteButtonClick'
  ],
  data () {
    return {
      isArtistNameActive: false,
      isBookmarkDeleted: false
    }
  },
  computed: {
    linkFormatted () {
      if (this.isArtistNameActive) {
        return this.artistMainLinkFormatted
      } else if (this.isBookmarkDeleted) {
        return {}
      } else {
        return this.albumMainLinkFormatted
      }
    },
    artistMainLinkFormatted () {
      return formatArtistMainLink({
        artistName: this.artistName
      })
    },
    artistName () {
      return this.albumData.artist.name
    },
    albumMainLinkFormatted () {
      return formatAlbumMainLink({
        artistName: this.artistName,
        albumTitle: this.albumTitle
      })
    },
    albumTitle () {
      return this.albumData.title
    },
    image () {
      return this.albumData.image.extrasmall
    },
    listenersCount () {
      return this.albumData.listeners_count
    },
    uuid () {
      return this.albumData.uuid
    },
    isDisabled () {
      return this.isBookmarkDeleted
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit('linkClick')
    },
    handleDeleteButtonClick () {
      this.$emit(
        'deleteButtonClick',
        { uuid: this.uuid }
      )
    },
    handleBookmarkDeleted () {
      this.isBookmarkDeleted = true
    },
    setIsArtistNameActive (value) {
      this.isArtistNameActive = value
    }
  }
}
</script>

<style lang="sass" scoped>
.main-simple-self-buttons
  margin-left: 0.5em

.delete-button
  margin-left: 0.5em !important
</style>
