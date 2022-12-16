<template>
  <div class="field">
    <BaseCalendar
      :key="key"
      input-name="birthdate"
      :date="value"
      :input-text="birthdateText"
      is-form-field
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import profileStore from '@/stores/profile'
import BaseCalendar from '@/components/BaseCalendar.vue'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'BaseProfileBirthdateField',
  components: {
    BaseCalendar
  },
  props: {
    value: String
  },
  data () {
    return {
      key: null
    }
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    ),
    ...mapState(
      profileStore,
      {
        profileLanguage: 'language'
      }
    ),
    birthdateText () {
      return this.$t(
        'forms.fields.birthdate'
      )
    }
  },
  watch: {
    profileLanguage:
      'handleProfileLanguageChange',
    isDarkMode: 'handleIsDarkModeChange'
  },
  methods: {
    handleProfileLanguageChange () {
      this.key = generateKey()
    },
    handleIsDarkModeChange () {
      this.key = generateKey()
    }
  }
}
</script>

<style lang="sass" scoped></style>
