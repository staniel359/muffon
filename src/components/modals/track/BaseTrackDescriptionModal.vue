<template>
  <BaseTrackModalContainer
    ref="modal"
    :scope="scope"
    :request-track-data="requestTrackData"
  >
    <template
      #default="slotProps"
    >
      <BaseDescriptionSection
        :description="slotProps[scope]"
      />
    </template>
  </BaseTrackModalContainer>
</template>

<script>
import BaseTrackModalContainer
  from '@/components/containers/modals/track/BaseTrackModalContainer.vue'
import BaseDescriptionSection
  from '@/components/sections/BaseDescriptionSection.vue'

export default {
  name: 'BaseTrackDescriptionModal',
  components: {
    BaseTrackModalContainer,
    BaseDescriptionSection
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
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
