<template>
  <BaseTrackModalContainer
    ref="modal"
    :scope="scope"
    :request-track-data="requestTrackData"
  >
    <template #default="slotProps">
      <BaseModalTagsList
        :tags="slotProps[scope]"
        @tag-click="handleTagClick"
      />
    </template>
  </BaseTrackModalContainer>
</template>

<script>
import BaseTrackModalContainer
  from '*/components/containers/modals/track/BaseTrackModalContainer.vue'
import BaseModalTagsList from '*/components/lists/tags/BaseModalTagsList.vue'

export default {
  name: 'BaseTrackTagsModal',
  components: {
    BaseTrackModalContainer,
    BaseModalTagsList
  },
  props: {
    requestTrackData: Object
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
