<template>
  <BaseAlbumModalContainer
    ref="modal"
    :scope="scope"
    :request-album-data="requestAlbumData"
  >
    <template #default="slotProps">
      <BaseModalTagsList
        :tags="slotProps[scope]"
        @tag-click="handleTagClick"
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
  data () {
    return {
      scope: 'tags'
    }
  },
  methods: {
    handleTagClick () {
      this.hide()
    },
    show () {
      this.$refs
        .modal
        .show()
    },
    hide () {
      this.$refs
        .modal
        .hide()
    }
  }
}
</script>

<style lang="sass" scoped></style>
