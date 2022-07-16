<template>
  <BaseSegmentContainer>
    <BaseHeader
      class="creator-header"
      tag="h4"
      :text="creatorTextFormatted"
    />

    <div>
      <BaseProfilesSimpleList
        :profiles="profiles"
        is-minimal
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
      return [
        this.creatorData
      ]
    },
    creatorTextFormatted () {
      return `${this.creatorText}:`
    },
    creatorText () {
      return this.$t(
        'roles.creator'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.creator-header
  margin-bottom: 0.5em !important
</style>
