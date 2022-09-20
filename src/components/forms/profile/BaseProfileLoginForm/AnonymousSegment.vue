<template>
  <BaseSegmentContainer
    class="anonymous-segment"
  >
    <strong
      class="main-link"
      @click="handleLinkClick"
      v-text="anonymousText"
    />

    <BaseIcon
      icon="right arrow continue-icon"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import {
  updateGlobal as updateGlobalStore
} from '@/helpers/actions/store'

export default {
  name: 'AnonymousSegment',
  components: {
    BaseSegmentContainer,
    BaseIcon
  },
  computed: {
    anonymousText () {
      return this.$t(
        'anonymous.continue'
      )
    }
  },
  methods: {
    handleLinkClick () {
      updateGlobalStore(
        {
          'profile.isAnonymous': true
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.anonymous-segment
  @extend .text-align-center

.continue-icon
  margin-left: 0.4em
</style>
