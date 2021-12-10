<template>
  <div>
    <div
      v-if="gender"
      class="ui tiny empty circular label profile-gender"
      :class="labelClassName"
    ></div>

    {{ age }}
  </div>
</template>

<script>
import { age as formatAge } from '#/formatters'

export default {
  name: 'BaseProfileGenderAge',
  props: {
    gender: String,
    birthdate: String
  },
  computed: {
    labelClassName () {
      switch (this.gender) {
        case 'male': return 'blue'
        case 'female': return 'pink'
        case 'other': return 'grey'
        default: return null
      }
    },
    age () {
      if (this.birthdate) {
        return formatAge(
          this.birthdate
        )
      } else {
        return null
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.profile-gender
  margin-right: 0.25em !important
</style>
