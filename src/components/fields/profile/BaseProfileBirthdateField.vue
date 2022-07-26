<template>
  <div class="field">
    <div
      ref="calendar"
      class="ui calendar"
      :class="{
        inverted: isDarkMode
      }"
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
import {
  mapState
} from 'vuex'
import BaseIcon from '*/components/BaseIcon.vue'
import {
  setCalendar
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
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    ),
    ...mapState(
      'profile',
      {
        profileLanguage: 'language'
      }
    ),
    birthdateText () {
      return this.$t(
        'forms.fields.birthdate'
      )
    },
    calendarOptions () {
      return birthdateCalendarOptions(
        {
          startDate: this.value
        }
      )
    }
  },
  watch: {
    profileLanguage: {
      immediate: true,
      handler: 'handleProfileLanguageChange'
    }
  },
  methods: {
    async handleProfileLanguageChange () {
      await this.$nextTick()

      setCalendar(
        this.$refs.calendar,
        this.calendarOptions
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
