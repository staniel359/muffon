<template>
  <BaseSegmentContainer
    class="anonymous-segment"
  >
    <span
      class="main-link"
      @click="handleLinkClick"
    >
      <strong
        v-text="anonymousText"
      />

      <BaseIcon
        class="continue-icon"
        icon="arrowRight"
        is-with-rtl
      />
    </span>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

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

[dir="ltr"]
  .continue-icon
    margin-left: 0.4em
[dir="rtl"]
  .continue-icon
    margin-right: 0.4em
</style>
