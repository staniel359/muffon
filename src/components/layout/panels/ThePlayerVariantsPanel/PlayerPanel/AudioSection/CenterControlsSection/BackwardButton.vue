<template>
  <BaseQueueDirectionButtonContainer
    position="previous"
    icon="audioPrevious"
  />
</template>

<script>
import BaseQueueDirectionButtonContainer
  from '@/components/containers/BaseQueueDirectionButtonContainer.vue'

export default {
  name: 'BackwardButton',
  components: {
    BaseQueueDirectionButtonContainer
  }
}
</script>

<style lang="sass" scoped></style>
