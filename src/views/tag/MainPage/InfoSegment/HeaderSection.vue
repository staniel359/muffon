<template>
  <div class="tag-header-container">
    <BaseHeaderContainer
      tag="h1"
      class="inverted tag-header"
      icon="tag"
    >
      {{ tagName }}
    </BaseHeaderContainer>
  </div>
</template>

<script>
import BaseHeaderContainer from '@/containers/BaseHeaderContainer.vue'

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

<style lang="sass" scoped>
.tag-header-container
  margin-bottom: 1.5em

.tag-header
  font-size: 2.5rem !important
  ::v-deep(.icon)
    font-size: 0.75em !important
</style>
