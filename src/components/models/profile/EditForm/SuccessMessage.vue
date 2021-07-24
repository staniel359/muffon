<template>
  <div class="ui success message">
    <i class="check icon"></i>
    {{ textFormatted }}
  </div>
</template>

<script>
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'SuccessMessage',
  computed: {
    textFormatted () {
      return localize(
        'shared.profile.form.success'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
