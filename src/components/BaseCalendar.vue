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
        icon="date"
        :class="{
          inverted: isDarkMode
        }"
      />

      <input
        v-if="isFormField"
        class="input"
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
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import {
  set as setCalendar,
  reset as resetCalendar
} from '@/helpers/actions/plugins/semantic/calendar'
import {
  main as mainCalendarOptions
} from '@/helpers/formatters/plugins/semantic/options/calendar'

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
  emits: [
    'change'
  ],
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    ),
    calendarOptions () {
      return mainCalendarOptions(
        {
          startDate: this.date,
          onChange: this.handleChange
        }
      )
    }
  },
  mounted () {
    setCalendar(
      this.$refs.calendar,
      this.calendarOptions
    )
  },
  methods: {
    handleChange (
      value
    ) {
      this.$emit(
        'change',
        value
      )
    },
    reset () {
      resetCalendar(
        this.$refs.calendar
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.input
  @extend .w-100
</style>
