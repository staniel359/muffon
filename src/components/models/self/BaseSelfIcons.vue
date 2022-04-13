<template>
  <div class="main-self-icons">
    <i
      v-if="libraryId"
      class="headphones primary icon main-simple-self-icon"
    />

    <i
      v-if="favoriteId"
      class="star primary icon main-simple-self-icon"
    />

    <i
      v-if="bookmarkId"
      class="bookmark primary icon main-simple-self-icon"
    />

    <i
      v-if="listenedId"
      class="check primary icon main-simple-self-icon"
    />
  </div>
</template>

<script>
export default {
  name: 'BaseSelfIcons',
  props: {
    libraryId: String,
    favoriteId: String,
    bookmarkId: String,
    listenedId: String
  }
}
</script>

<style lang="sass" scoped></style>
