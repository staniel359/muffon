<template>
  <BaseMessage
    class="success success-message"
    :icons="[
      'check'
    ]"
    :header="updatedText"
  />
</template>

<script>
import BaseMessage from '*/components/messages/BaseMessage.vue'

export default {
  name: 'SuccessMessage',
  components: {
    BaseMessage
  },
  computed: {
    updatedText () {
      return this.$t(
        'profile.updated'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.success-message
  margin-bottom: 1em !important
</style>
