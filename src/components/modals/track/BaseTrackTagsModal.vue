<template>
  <BaseTrackModalContainer
    ref="modal"
    scope="tags"
    :artistName="artistName"
    :trackTitle="trackTitle"
  >
    <template #default="slotProps">
      <BaseModalTagsList
        :tags="slotProps.tags"
        @tagClick="handleTagClick"
      />
    </template>
  </BaseTrackModalContainer>
</template>

<script>
import BaseTrackModalContainer
  from '@/containers/track/BaseTrackModalContainer.vue'
import BaseModalTagsList from '@/lists/tags/BaseModalTagsList.vue'

export default {
  name: 'BaseTrackTagsModal',
  components: {
    BaseTrackModalContainer,
    BaseModalTagsList
  },
  props: {
    artistName: String,
    trackTitle: String
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
