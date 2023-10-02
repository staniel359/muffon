<template>
  <div class="main-top-large-section">
    <BaseHeaderContainer
      class="inverted massive"
      tag="h1"
      icon="tag"
      is-icon-small
    >
      {{ tagName }}
    </BaseHeaderContainer>
  </div>
</template>

<script>
import BaseHeaderContainer
  from '@/components/containers/BaseHeaderContainer.vue'

export default {
  name: 'HeaderSection',
  components: {
    BaseHeaderContainer
  },
  props: {
    tagName: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped></style>
