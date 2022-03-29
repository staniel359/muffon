<template>
  <BaseVideoModalContainer
    ref="modal"
    scope="tags"
    :videoId="videoId"
  >
    <template #default="slotProps">
      <BaseModalTagsList
        :tags="slotProps.tags"
        @tagClick="handleTagClick"
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
  methods: {
    handleTagClick () {
      this.$refs.modal.hide()
    },
    show () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
