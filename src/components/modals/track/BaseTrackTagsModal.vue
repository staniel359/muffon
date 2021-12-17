<template>
  <BaseTrackModalContainer
    ref="modal"
    scope="tags"
    :requestTrackData="requestTrackData"
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
  from '@/containers/modals/track/BaseTrackModalContainer.vue'
import BaseModalTagsList from '@/lists/tags/BaseModalTagsList.vue'

export default {
  name: 'BaseTrackTagsModal',
  components: {
    BaseTrackModalContainer,
    BaseModalTagsList
  },
  props: {
    requestTrackData: Object
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
