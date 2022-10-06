<template>
  <div class="main-self-icons">
    <BaseIcon
      v-if="isRenderLibraryIcon"
      class="main-simple-self-icon"
      icon="primary headphones"
    />

    <BaseIcon
      v-if="isRenderFavoriteIcon"
      class="main-simple-self-icon"
      icon="primary star"
    />

    <BaseIcon
      v-if="isRenderBookmarkIcon"
      class="main-simple-self-icon"
      icon="primary bookmark"
    />

    <BaseIcon
      v-if="listenedId"
      class="main-simple-self-icon"
      icon="primary check"
    />
  </div>
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'

export default {
  name: 'BaseSelfIcons',
  components: {
    BaseIcon
  },
  props: {
    isWithLibraryIcon: {
      type: Boolean,
      default: true
    },
    isWithFavoriteIcon: {
      type: Boolean,
      default: true
    },
    isWithBookmarkIcon: {
      type: Boolean,
      default: true
    },
    libraryId: String,
    favoriteId: String,
    bookmarkId: String,
    listenedId: String
  },
  computed: {
    isRenderLibraryIcon () {
      return (
        this.isWithLibraryIcon &&
          !!this.libraryId
      )
    },
    isRenderFavoriteIcon () {
      return (
        this.isWithFavoriteIcon &&
          !!this.favoriteId
      )
    },
    isRenderBookmarkIcon () {
      return (
        this.isWithBookmarkIcon &&
          !!this.bookmarkId
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
