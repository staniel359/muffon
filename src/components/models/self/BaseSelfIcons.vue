<template>
  <div
    v-if="isRender"
    class="main-self-icons"
  >
    <BaseIcon
      v-if="isRenderLibraryIcon"
      class="primary main-simple-self-icon"
      icon="library"
    />

    <BaseIcon
      v-if="isRenderFavoriteIcon"
      class="primary main-simple-self-icon"
      icon="favorite"
    />

    <BaseIcon
      v-if="isRenderBookmarkIcon"
      class="primary main-simple-self-icon"
      icon="bookmark"
    />

    <BaseIcon
      v-if="listenedId"
      class="primary main-simple-self-icon"
      icon="listened"
    />

    <BaseIcon
      v-if="watchedId"
      class="primary main-simple-self-icon"
      icon="watched"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
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
    listenedId: String,
    watchedId: String
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    ),
    isRender () {
      return (
        this.profileId
      )
    },
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
