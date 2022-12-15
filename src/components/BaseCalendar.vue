<template>
  <div
    ref="calendar"
    class="ui calendar"
    :class="{
      inverted: isDarkMode
    }"
  >
    <div class="ui input left icon">
      <BaseIcon
        icon="calendar outline"
        :class="{
          inverted: isDarkMode
        }"
      />

      <input
        v-if="isFormField"
        type="text"
        :name="inputName"
        :placeholder="inputText"
      >
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import {
  setCalendar
} from '@/helpers/actions/plugins/semantic'
import {
  birthdateCalendarOptions
} from '@/helpers/formatters/semantic'

export default {
  name: 'BaseCalendar',
  components: {
    BaseIcon
  },
  props: {
    date: String,
    isFormField: Boolean,
    inputName: String,
    inputText: String
  },
  computed: {
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    ),
    calendarOptions () {
      return birthdateCalendarOptions(
        {
          startDate: this.date
        }
      )
    }
  },
  mounted () {
    setCalendar(
      this.$refs.calendar,
      this.calendarOptions
    )
  }
}
</script>

<style lang="sass" scoped></style>
