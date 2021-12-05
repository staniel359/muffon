<template>
  <BaseQueueDirectionButtonContainer
    position="prev"
    icon="backward"
  />
</template>

<script>
import BaseQueueDirectionButtonContainer
  from '@/containers/BaseQueueDirectionButtonContainer.vue'

export default {
  name: 'BackwardButton',
  components: {
    BaseQueueDirectionButtonContainer
  }
}
</script>

<style lang="sass" scoped></style>
