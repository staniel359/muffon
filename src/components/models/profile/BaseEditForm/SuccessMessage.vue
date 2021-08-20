<template>
  <BaseMessage
    class="success success-message"
    :icons="['check']"
    :header="headerFormatted"
  />
</template>

<script>
import BaseMessage from '@/BaseMessage.vue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'SuccessMessage',
  components: {
    BaseMessage
  },
  computed: {
    headerFormatted () {
      return localize(
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
