<template>
  <BaseSegmentContainer>
    <BaseHeaderContainer tag="h3">
      <BaseLink
        v-if="formatHeaderLink"
        :link="headerLink"
        :text="headerText"
      />
      <template v-else>
        {{ headerText }}
      </template>
    </BaseHeaderContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseHeaderContainer
  from '*/components/containers/BaseHeaderContainer.vue'
import BaseLink from '*/components/links/BaseLink.vue'

export default {
  name: 'HeaderSegment',
  components: {
    BaseSegmentContainer,
    BaseHeaderContainer,
    BaseLink
  },
  props: {
    headerTextKey: {
      type: String,
      required: true
    },
    formatHeaderLink: Function,
    videoId: String
  },
  computed: {
    headerLink () {
      return this.formatHeaderLink({
        videoId: this.videoId
      })
    },
    headerText () {
      return this.$t(
        `navigation.${this.headerTextKey}`
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
