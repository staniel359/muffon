<template>
  <BaseSegmentContainer>
    <BaseHeader
      class="creator-header"
      tag="h4"
      text="Creator:"
    />

    <div>
      <BaseProfilesSimpleList
        :profiles="profiles"
        isMinimal
      />
    </div>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseProfilesSimpleList
  from '*/components/lists/profiles/BaseProfilesSimpleList.vue'

export default {
  name: 'CreatorSegment',
  components: {
    BaseSegmentContainer,
    BaseHeader,
    BaseProfilesSimpleList
  },
  props: {
    creatorData: {
      type: Object,
      required: true
    }
  },
  computed: {
    profiles () {
      return [this.creatorData]
    }
  }
}
</script>

<style lang="sass" scoped>
.creator-header
  margin-bottom: 0.25em !important
</style>
