<template>
  <BaseVideoModalContainer
    ref="modal"
    scope="description"
    :videoId="videoId"
  >
    <template #default="slotProps">
      <BaseDescription
        :description="slotProps.description"
        isModal
      />
    </template>
  </BaseVideoModalContainer>
</template>

<script>
import BaseVideoModalContainer
  from '*/components/containers/modals/video/BaseVideoModalContainer.vue'
import BaseDescription from '*/components/BaseDescription.vue'

export default {
  name: 'BaseVideoDescriptionModal',
  components: {
    BaseVideoModalContainer,
    BaseDescription
  },
  props: {
    videoId: String
  },
  methods: {
    show () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
