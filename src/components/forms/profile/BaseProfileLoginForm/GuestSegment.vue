<template>
  <BaseSegmentContainer
    class="text-align-center"
  >
    <span
      class="main-link"
      @click="handleLinkClick"
    >
      <strong
        v-text="text"
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
  name: 'GuestSegment',
  components: {
    BaseSegmentContainer,
    BaseIcon
  },
  computed: {
    text () {
      return this.$t(
        'guest.continue'
      )
    }
  },
  methods: {
    handleLinkClick () {
      updateGlobalStore(
        {
          'session.isGuest': true
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
