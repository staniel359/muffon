<template>
  <BaseDropdown
    class="search main-select"
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
import BaseDropdown from '@/components/dropdowns/BaseDropdown.vue'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'
import {
  timezones as formatTimezones
} from '@/helpers/formatters'

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
      return formatTimezones()
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
