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
  from '@/containers/album/BaseAlbumModalContainer.vue'
import BaseModalTagsList from '@/lists/tags/BaseModalTagsList.vue'

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
