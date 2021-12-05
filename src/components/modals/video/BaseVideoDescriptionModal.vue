<template>
  <BaseVideoModalContainer
    ref="modal"
    scope="description"
    :videoId="videoId"
  >
    <template #default="slotProps">
      <BaseModalDescription
        :description="slotProps.description"
      />
    </template>
  </BaseVideoModalContainer>
</template>

<script>
import BaseVideoModalContainer
  from '@/containers/video/BaseVideoModalContainer.vue'
import BaseModalDescription from '@/BaseModalDescription.vue'

export default {
  name: 'BaseVideoDescriptionModal',
  components: {
    BaseVideoModalContainer,
    BaseModalDescription
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
