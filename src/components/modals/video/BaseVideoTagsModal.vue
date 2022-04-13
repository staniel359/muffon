<template>
  <BaseVideoModalContainer
    ref="modal"
    :video-id="videoId"
    :scope="scope"
  >
    <template #default="slotProps">
      <BaseModalTagsList
        :tags="slotProps[scope]"
        @tag-click="handleTagClick"
      />
    </template>
  </BaseVideoModalContainer>
</template>

<script>
import BaseVideoModalContainer
  from '*/components/containers/modals/video/BaseVideoModalContainer.vue'
import BaseModalTagsList from '*/components/lists/tags/BaseModalTagsList.vue'

export default {
  name: 'BaseVideoTagsModal',
  components: {
    BaseVideoModalContainer,
    BaseModalTagsList
  },
  props: {
    videoId: String
  },
  data () {
    return {
      scope: 'tags'
    }
  },
  methods: {
    handleTagClick () {
      this.$refs
        .modal
        .hide()
    },
    show () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
