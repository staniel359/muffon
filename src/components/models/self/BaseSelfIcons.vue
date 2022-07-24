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
      v-if="bookmarkId"
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
import BaseIcon from '*/components/BaseIcon.vue'

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
    }
  }
}
</script>

<style lang="sass" scoped></style>
