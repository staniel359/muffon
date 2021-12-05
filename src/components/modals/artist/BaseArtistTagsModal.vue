<template>
  <BaseArtistModalContainer
    ref="modal"
    scope="tags"
    :artistName="artistName"
  >
    <template #default="slotProps">
      <BaseModalTagsList
        :tags="slotProps.tags"
        @tagClick="handleTagClick"
      />
    </template>
  </BaseArtistModalContainer>
</template>

<script>
import BaseArtistModalContainer
  from '@/containers/artist/BaseArtistModalContainer.vue'
import BaseModalTagsList from '@/lists/tags/BaseModalTagsList.vue'

export default {
  name: 'BaseArtistTagsModal',
  components: {
    BaseArtistModalContainer,
    BaseModalTagsList
  },
  props: {
    artistName: String
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
