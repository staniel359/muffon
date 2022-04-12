<template>
  <BaseErrorMessage
    v-if="error"
    :error="error"
  />
  <SuccessSection
    v-else-if="successTracks.length"
    :tracks="successTracks"
  />
</template>

<script>
import BaseErrorMessage from '*/components/messages/BaseErrorMessage.vue'
import SuccessSection from './CompleteSection/SuccessSection.vue'

export default {
  name: 'CompleteSection',
  components: {
    BaseErrorMessage,
    SuccessSection
  },
  props: {
    error: Boolean,
    successTracks: Array
  }
}
</script>

<style lang="sass" scoped></style>
