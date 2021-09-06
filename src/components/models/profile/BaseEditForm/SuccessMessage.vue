<template>
  <BaseMessage
    class="success success-message"
    :icons="['check']"
    :header="headerFormatted"
  />
</template>

<script>
import BaseMessage from '@/BaseMessage.vue'

export default {
  name: 'SuccessMessage',
  components: {
    BaseMessage
  },
  computed: {
    headerFormatted () {
      return this.$t(
        'shared.profile.form.success'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.success-message
  margin-bottom: 1em !important
</style>
