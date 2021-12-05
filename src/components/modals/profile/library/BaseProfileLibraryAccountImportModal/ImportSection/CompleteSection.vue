<template>
  <div class="main-library-modal-complete-section">
    <BaseErrorMessage
      v-if="error"
      :error="error"
    />
    <SuccessSection
      v-else-if="successTracks.length"
      :tracks="successTracks"
    />
  </div>
</template>

<script>
import BaseErrorMessage from '@/BaseErrorMessage.vue'
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
