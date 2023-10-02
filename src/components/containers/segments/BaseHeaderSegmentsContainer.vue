<template>
  <BaseSegmentsContainer
    ref="segment"
    class="simple"
  >
    <template
      #default
    >
      <HeaderSegment
        :scope="scope"
        :link="headerLink"
      />

      <slot />
    </template>
  </BaseSegmentsContainer>
</template>

<script>
import BaseSegmentsContainer
  from '@/components/containers/segments/BaseSegmentsContainer.vue'
import HeaderSegment from './BaseHeaderSegmentsContainer/HeaderSegment.vue'

export default {
  name: 'BaseHeaderSegmentsContainer',
  components: {
    BaseSegmentsContainer,
    HeaderSegment
  },
  props: {
    scope: String,
    headerLink: Object
  },
  methods: {
    focus () {
      this.$refs
        .segment
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
