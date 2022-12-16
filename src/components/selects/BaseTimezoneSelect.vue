<template>
  <BaseDropdown
    class="search main-timezone-select"
    :options="timezonesFormatted"
    :selected="profileTimezone"
    @select="handleSelect"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import moment from 'moment-timezone'
import BaseDropdown from '@/components/dropdowns/BaseDropdown.vue'
import {
  updateGlobal as updateGlobalStore
} from '@/helpers/actions/store'

export default {
  name: 'BaseTimezoneSelect',
  components: {
    BaseDropdown
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileTimezone: 'timezone'
      }
    ),
    timezonesFormatted () {
      return this.timezones.map(
        this.formatTimezone
      )
    },
    timezones () {
      return moment.tz.names()
    }
  },
  methods: {
    handleSelect (
      value
    ) {
      updateGlobalStore(
        {
          'profile.timezone': value
        }
      )
    },
    formatTimezone (
      timezone
    ) {
      return {
        id: timezone,
        name: timezone
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
