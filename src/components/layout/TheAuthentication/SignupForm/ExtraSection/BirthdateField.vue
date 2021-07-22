<template>
  <div class="field">
    <div
      class="ui calendar"
      ref="calendar"
    >
      <div class="ui input left icon">
        <i class="calendar icon"></i>
        <input
          type="text"
          name="birthdate"
          :placeholder="placeholderFormatted"
        >
      </div>
    </div>
  </div>
</template>

<script>
import { localize } from '#/actions/plugins/i18n'
import { setCalendar } from '#/actions/plugins/semantic'
import { birthdateCalendarOptions } from '#/data/plugins/semantic'

export default {
  name: 'BirthdateField',
  computed: {
    placeholderFormatted () {
      return localize(
        'shared.profile.form.fields.birthdate'
      )
    }
  },
  mounted () {
    setCalendar(
      this.$refs.calendar,
      birthdateCalendarOptions()
    )
  }
}
</script>

<style lang="sass" scoped></style>
