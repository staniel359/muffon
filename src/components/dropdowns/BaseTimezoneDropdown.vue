<template>
  <BaseDropdownContainer
    class="search main-timezone-dropdown"
    :selected="profileTimezone"
    @select="handleSelect"
  >
    <div
      v-for="(timezone, index) in timezoneList"
      :key="index"
      class="item"
      :data-value="timezone"
      v-text="timezone"
    />
  </BaseDropdownContainer>
</template>

<script>
import {
  mapState
} from 'vuex'
import moment from 'moment-timezone'
import BaseDropdownContainer
  from '*/components/containers/BaseDropdownContainer.vue'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'

export default {
  name: 'BaseTimezoneDropdown',
  components: {
    BaseDropdownContainer
  },
  computed: {
    ...mapState(
      'profile',
      {
        profileTimezone: 'timezone'
      }
    ),
    timezoneList () {
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
