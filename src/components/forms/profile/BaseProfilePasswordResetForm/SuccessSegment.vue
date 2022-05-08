<template>
  <BaseSegmentContainer>
    <BaseMessage
      class="success"
      :icons="[
        'check'
      ]"
      :header="passwordUpdatedHeaderText"
      :content="passwordUpdatedContentText"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseMessage from '*/components/messages/BaseMessage.vue'

export default {
  name: 'SuccessSegment',
  components: {
    BaseSegmentContainer,
    BaseMessage
  },
  computed: {
    passwordUpdatedHeaderText () {
      return this.$t(
        'passwordReset.updated.header'
      )
    },
    passwordUpdatedContentText () {
      return this.$t(
        'passwordReset.updated.content'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
