<template>
  <div
    v-if="isRender"
    class="main-simple-self-buttons"
  >
    <BaseLibrarySimpleButton
      v-if="isRenderLibraryLink"
      class="main-simple-self-button"
      :model="model"
      :modelId="libraryId"
    />

    <BaseListenedSimpleButton
      v-if="isRenderListenedButton"
      class="main-simple-self-button"
      :model="model"
      :modelId="listenedId"
    />

    <BaseBookmarkSimpleButton
      v-if="isRenderBookmarkButton"
      class="main-simple-self-button"
      :model="model"
      :modelId="bookmarkId"
    />
  </div>
</template>

<script>
import BaseLibrarySimpleButton
  from './BaseSelfSimpleButtons/BaseLibrarySimpleButton.vue'
import BaseListenedSimpleButton
  from './BaseSelfSimpleButtons/BaseListenedSimpleButton.vue'
import BaseBookmarkSimpleButton
  from './BaseSelfSimpleButtons/BaseBookmarkSimpleButton.vue'

export default {
  name: 'BaseSelfSimpleButtons',
  components: {
    BaseLibrarySimpleButton,
    BaseListenedSimpleButton,
    BaseBookmarkSimpleButton
  },
  props: {
    modelData: {
      type: Object,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    isWithLibraryLink: Boolean,
    isWithListenedButton: Boolean,
    isWithBookmarkButton: Boolean
  },
  computed: {
    isRender () {
      return (
        this.isRenderLibraryLink ||
          this.isRenderListenedButton ||
          this.isRenderBookmarkButton
      )
    },
    isRenderLibraryLink () {
      return (
        this.isWithLibraryLink &&
          !!this.libraryId
      )
    },
    libraryId () {
      return this.modelData.library_id?.toString()
    },
    isRenderListenedButton () {
      return (
        this.isWithListenedButton &&
          !!this.listenedId
      )
    },
    listenedId () {
      return this.modelData.listened_id?.toString()
    },
    isRenderBookmarkButton () {
      return (
        this.isWithBookmarkButton &&
          !!this.bookmarkId
      )
    },
    bookmarkId () {
      return this.modelData.bookmark_id?.toString()
    }
  }
}
</script>

<style lang="sass" scoped></style>
