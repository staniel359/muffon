<template>
  <div
    ref="calendar"
    class="ui calendar base-calendar"
    :class="{
      inverted: isDarkMode
    }"
  >
    <BaseInputContainer
      class="left icon"
      icon="date"
    >
      <input
        v-if="isFormField"
        class="input width-100"
        type="text"
        :name="inputName"
        :placeholder="inputText"
      >
    </BaseInputContainer>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseInputContainer
  from '@/components/containers/inputs/BaseInputContainer.vue'
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
    BaseInputContainer
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

<style lang="sass" scoped></style>
