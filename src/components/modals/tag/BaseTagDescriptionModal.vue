<template>
  <BaseTagModalContainer
    ref="modal"
    scope="description"
    :tagName="tagName"
  >
    <template #default="slotProps">
      <BaseDescription
        :description="slotProps.description"
        isModal
      />
    </template>
  </BaseTagModalContainer>
</template>

<script>
import BaseTagModalContainer
  from '@/containers/modals/tag/BaseTagModalContainer.vue'
import BaseDescription from '@/BaseDescription.vue'

export default {
  name: 'BaseTagDescriptionModal',
  components: {
    BaseTagModalContainer,
    BaseDescription
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
