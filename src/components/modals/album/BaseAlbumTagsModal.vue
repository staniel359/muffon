<template>
  <BaseAlbumModalContainer
    ref="modal"
    scope="tags"
    :requestAlbumData="requestAlbumData"
  >
    <template #default="slotProps">
      <BaseModalTagsList
        :tags="slotProps.tags"
        @tagClick="handleTagClick"
      />
    </template>
  </BaseAlbumModalContainer>
</template>

<script>
import BaseAlbumModalContainer
  from '*/components/containers/modals/album/BaseAlbumModalContainer.vue'
import BaseModalTagsList from '*/components/lists/tags/BaseModalTagsList.vue'

export default {
  name: 'BaseAlbumTagsModal',
  components: {
    BaseAlbumModalContainer,
    BaseModalTagsList
  },
  props: {
    requestAlbumData: Object
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
