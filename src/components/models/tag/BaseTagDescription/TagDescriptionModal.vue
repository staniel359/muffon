<template>
  <BaseTagModalContainer
    ref="modal"
    scope="description"
    :tagName="tagName"
  >
    <template #default="slotProps">
      <BaseModalDescription
        :description="slotProps.description"
      />
    </template>
  </BaseTagModalContainer>
</template>

<script>
import BaseTagModalContainer from '@/containers/tag/BaseTagModalContainer.vue'
import BaseModalDescription from '@/BaseModalDescription.vue'

export default {
  name: 'TagDescriptionModal',
  components: {
    BaseTagModalContainer,
    BaseModalDescription
  },
  props: {
    tagName: String
  },
  methods: {
    show () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
