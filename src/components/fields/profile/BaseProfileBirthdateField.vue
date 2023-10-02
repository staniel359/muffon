<template>
  <div class="field main-field">
    <BaseCalendar
      ref="calendar"
      :key="key"
      class="flex-full"
      input-name="birthdate"
      :date="birthdate"
      :input-text="birthdateText"
      is-form-field
      @change="handleChange"
    />

    <BaseClearButton
      v-if="value"
      @click="handleClearButtonClick"
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
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'BaseProfileBirthdateField',
  components: {
    BaseCalendar,
    BaseClearButton
  },
  props: {
    birthdate: String
  },
  data () {
    return {
      value: null,
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
  mounted () {
    this.value = this.birthdate
  },
  methods: {
    handleProfileLanguageChange () {
      this.key = generateKey()
    },
    handleIsDarkModeChange () {
      this.key = generateKey()
    },
    handleChange (
      value
    ) {
      this.value = value
    },
    handleClearButtonClick () {
      this.reset()

      this.value = null
    },
    reset () {
      this.$refs
        .calendar
        .reset()
    }
  }
}
</script>

<style lang="sass" scoped></style>
