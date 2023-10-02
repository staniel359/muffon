<template>
  <div class="tag-header-container">
    <BaseHeaderContainer
      class="inverted tag-header"
      tag="h1"
      icon="tag"
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

<style lang="sass" scoped>
.tag-header-container
  margin-bottom: 2rem

.tag-header
  font-size: 2.5rem !important
  :deep(.icon)
    @extend .main-left-icon
    font-size: 2rem !important
</style>
