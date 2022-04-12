<template>
  <BaseTrackModalContainer
    ref="modal"
    :scope="scope"
    :requestTrackData="requestTrackData"
  >
    <template #default="slotProps">
      <BaseDescription
        :description="slotProps[scope]"
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
  data () {
    return {
      scope: 'description'
    }
  },
  methods: {
    show () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
