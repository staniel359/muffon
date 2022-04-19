<template>
  <div class="main-self-icons">
    <BaseIcon
      v-if="libraryId"
      class="main-simple-self-icon"
      icon="primary headphones"
    />

    <BaseIcon
      v-if="favoriteId"
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
    libraryId: String,
    favoriteId: String,
    bookmarkId: String,
    listenedId: String
  }
}
</script>

<style lang="sass" scoped></style>
