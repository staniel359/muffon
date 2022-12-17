<template>
  <BaseQueueDirectionButtonContainer
    position="next"
    icon="audioNext"
  />
</template>

<script>
import BaseQueueDirectionButtonContainer
  from '@/components/containers/BaseQueueDirectionButtonContainer.vue'

export default {
  name: 'ForwardButton',
  components: {
    BaseQueueDirectionButtonContainer
  }
}
</script>

<style lang="sass" scoped></style>
