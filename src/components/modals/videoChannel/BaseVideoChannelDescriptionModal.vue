<template>
  <BaseVideoChannelModalContainer
    ref="modal"
    :channel-id="channelId"
    :scope="scope"
  >
    <template
      #default="slotProps"
    >
      <BaseDescriptionSection
        :description="slotProps[scope]"
        is-modal
      />
    </template>
  </BaseVideoChannelModalContainer>
</template>

<script>
import BaseVideoChannelModalContainer
  from '@/components/containers/modals/videoChannel/BaseVideoChannelModalContainer.vue'
import BaseDescriptionSection
  from '@/components/sections/BaseDescriptionSection.vue'

export default {
  name: 'BaseVideoChannelDescriptionModal',
  components: {
    BaseVideoChannelModalContainer,
    BaseDescriptionSection
  },
  props: {
    channelId: String
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
