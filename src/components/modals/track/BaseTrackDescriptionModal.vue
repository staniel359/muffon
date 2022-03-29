<template>
  <BaseTrackModalContainer
    ref="modal"
    scope="description"
    :requestTrackData="requestTrackData"
  >
    <template #default="slotProps">
      <BaseDescription
        :description="slotProps.description"
        isModal
      />
    </template>
  </BaseTrackModalContainer>
</template>

<script>
import BaseTrackModalContainer
  from '*/components/containers/modals/track/BaseTrackModalContainer.vue'
import BaseDescription from '*/components/BaseDescription.vue'

export default {
  name: 'BaseTrackDescriptionModal',
  components: {
    BaseTrackModalContainer,
    BaseDescription
  },
  props: {
    requestTrackData: Object
  },
  methods: {
    show () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
