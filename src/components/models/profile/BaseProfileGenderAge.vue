<template>
  <div v-if="gender || age">
    <div
      v-if="gender"
      class="ui tiny empty circular label profile-gender"
      :class="labelColor"
    ></div>

    {{ age }}
  </div>
</template>

<script>
import { age as formatAge } from '*/helpers/formatters'

export default {
  name: 'BaseProfileGenderAge',
  props: {
    profileData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      genders: {
        male: 'blue',
        female: 'pink',
        other: 'grey'
      }
    }
  },
  computed: {
    labelColor () {
      return this.genders[
        this.gender
      ]
    },
    gender () {
      return this.profileData.gender
    },
    age () {
      if (this.birthdate) {
        return formatAge(
          this.birthdate
        )
      } else {
        return null
      }
    },
    birthdate () {
      return this.profileData.birthdate
    }
  }
}
</script>

<style lang="sass" scoped>
.profile-gender
  margin-right: 0.25em !important
</style>
