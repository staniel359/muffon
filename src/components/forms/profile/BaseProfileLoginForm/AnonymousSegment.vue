<template>
  <BaseSegmentContainer
    class="text-align-center"
  >
    <span
      class="main-link"
      @click="handleLinkClick"
    >
      <strong
        v-text="anonymousText"
      />

      <BaseIcon
        class="main-icon main-right-extrasmall-section"
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

<style lang="sass" scoped></style>
