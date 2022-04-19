<template>
  <div class="field">
    <div
      ref="calendar"
      class="ui calendar"
    >
      <div class="ui input left icon">
        <BaseIcon
          icon="calendar"
        />

        <input
          type="text"
          name="birthdate"
          :placeholder="birthdateText"
        >
      </div>
    </div>
  </div>
</template>

<script>
import BaseIcon from '*/components/BaseIcon.vue'
import {
  setCalendar,
  setCalendarDate
} from '*/helpers/actions/plugins/semantic'
import {
  birthdateCalendarOptions
} from '*/helpers/data/plugins/semantic'

export default {
  name: 'BaseProfileBirthdateField',
  components: {
    BaseIcon
  },
  props: {
    value: String
  },
  computed: {
    birthdateText () {
      return this.$t(
        'forms.fields.birthdate'
      )
    }
  },
  async mounted () {
    setCalendarDate(
      this.$refs.calendar,
      this.value
    )

    await this.$nextTick()

    setCalendar(
      this.$refs.calendar,
      birthdateCalendarOptions()
    )
  }
}
</script>

<style lang="sass" scoped></style>
