<template>
  <BaseVideosSimpleList
    :videos="videos"
    is-with-delete-option
    is-clearable
    @link-click="handleLinkClick"
    @delete-option-click="handleDeleteOptionClick"
  />
</template>

<script>
import BaseVideosSimpleList
  from '*/components/lists/videos/BaseVideosSimpleList.vue'

export default {
  name: 'VideosSection',
  components: {
    BaseVideosSimpleList
  },
  inject: [
    'deleteModel'
  ],
  props: {
    videos: Array
  },
  emits: [
    'linkClick'
  ],
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    handleDeleteOptionClick (
      {
        uuid
      }
    ) {
      this.deleteModel(
        {
          uuid,
          scope: 'videos'
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
