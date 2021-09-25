<template>
  <BaseAccordionContainer
    :title="headerFormatted"
    :isTextWhite="isTextWhite"
  >
    <LibraryButton
      class="main-self-button"
      :model="model"
      :modelId="libraryId"
      :artistName="artistName"
      :albumTitle="albumTitle"
      :albumTracks="albumTracks"
      :trackTitle="trackTitle"
      :imageUrl="imageUrl"
    />

    <FavoriteButton
      class="main-self-button"
      :model="model"
      :modelId="favoriteId"
      :artistName="artistName"
      :albumTitle="albumTitle"
      :trackTitle="trackTitle"
      :imageUrl="imageUrl"
    />

    <BookmarkButton
      class="main-self-button"
      :model="model"
      :modelId="bookmarkId"
      :artistName="artistName"
      :albumTitle="albumTitle"
      :trackTitle="trackTitle"
      :imageUrl="imageUrl"
    />

    <ListenedButton
      class="main-self-button"
      :model="model"
      :modelId="listenedId"
      :artistName="artistName"
      :albumTitle="albumTitle"
      :trackTitle="trackTitle"
      :imageUrl="imageUrl"
    />
  </BaseAccordionContainer>
</template>

<script>
import BaseAccordionContainer from '@/containers/BaseAccordionContainer.vue'
import LibraryButton from './BaseSelfButtons/LibraryButton.vue'
import FavoriteButton from './BaseSelfButtons/FavoriteButton.vue'
import BookmarkButton from './BaseSelfButtons/BookmarkButton.vue'
import ListenedButton from './BaseSelfButtons/ListenedButton.vue'

export default {
  name: 'BaseSelfButtons',
  components: {
    BaseAccordionContainer,
    LibraryButton,
    FavoriteButton,
    BookmarkButton,
    ListenedButton
  },
  props: {
    model: String,
    libraryId: String,
    favoriteId: String,
    bookmarkId: String,
    listenedId: String,
    artistName: String,
    albumTitle: String,
    albumTracks: Array,
    trackTitle: String,
    imageUrl: String,
    isTextWhite: Boolean
  },
  computed: {
    headerFormatted () {
      return this.$t(
        'shared.self.actions'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
