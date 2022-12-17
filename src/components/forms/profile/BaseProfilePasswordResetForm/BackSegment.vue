<template>
  <BaseSegmentContainer>
    <span
      class="main-link"
      @click="handleBackLinkClick"
    >
      <BaseIcon
        icon="arrowLeft"
      />

      {{ backText }}
    </span>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'

export default {
  name: 'BackSegment',
  components: {
    BaseSegmentContainer,
    BaseIcon
  },
  emits: [
    'backLinkClick'
  ],
  computed: {
    backText () {
      return this.$t(
        'actions.back'
      )
    }
  },
  methods: {
    handleBackLinkClick () {
      this.$emit(
        'backLinkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
