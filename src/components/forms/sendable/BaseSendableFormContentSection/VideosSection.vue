<template>
  <BaseVideosSimpleList
    :videos="videos"
    is-with-clear-button
    @link-click="handleLinkClick"
    @clear-button-click="handleClearButtonClick"
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
    handleClearButtonClick (
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
