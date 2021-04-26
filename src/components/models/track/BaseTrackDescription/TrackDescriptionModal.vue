<template>
  <BaseTrackModalContainer
    ref="modal"
    scope="description"
    :artistName="artistName"
    :trackTitle="trackTitle"
  >
    <template #default="slotProps">
      <BaseModalDescription
        :description="slotProps.description"
      />
    </template>
  </BaseTrackModalContainer>
</template>

<script>
import BaseTrackModalContainer
  from '@/containers/track/BaseTrackModalContainer.vue'
import BaseModalDescription from '@/BaseModalDescription.vue'

export default {
  name: 'TrackDescriptionModal',
  components: {
    BaseTrackModalContainer,
    BaseModalDescription
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
