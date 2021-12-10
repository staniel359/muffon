<template>
  <BaseTrackModalContainer
    ref="modal"
    scope="description"
    :artistName="artistName"
    :trackTitle="trackTitle"
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
  from '@/containers/modals/track/BaseTrackModalContainer.vue'
import BaseDescription from '@/BaseDescription.vue'

export default {
  name: 'BaseTrackDescriptionModal',
  components: {
    BaseTrackModalContainer,
    BaseDescription
  },
  props: {
    artistName: String,
    trackTitle: String
  },
  methods: {
    show () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
