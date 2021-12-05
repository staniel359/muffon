<template>
  <BaseQueueDirectionButtonContainer
    position="next"
    icon="forward"
  />
</template>

<script>
import BaseQueueDirectionButtonContainer
  from '@/containers/BaseQueueDirectionButtonContainer.vue'

export default {
  name: 'ForwardButton',
  components: {
    BaseQueueDirectionButtonContainer
  }
}
</script>

<style lang="sass" scoped></style>
