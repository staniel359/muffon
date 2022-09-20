<template>
  <BaseVideoChannelModalContainer
    ref="modal"
    :channel-id="channelId"
    :scope="scope"
  >
    <template #default="slotProps">
      <BaseDescription
        :description="slotProps[scope]"
        is-modal
      />
    </template>
  </BaseVideoChannelModalContainer>
</template>

<script>
import BaseVideoChannelModalContainer
  from '@/components/containers/modals/videoChannel/BaseVideoChannelModalContainer.vue'
import BaseDescription from '@/components/BaseDescription.vue'

export default {
  name: 'BaseVideoChannelDescriptionModal',
  components: {
    BaseVideoChannelModalContainer,
    BaseDescription
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
