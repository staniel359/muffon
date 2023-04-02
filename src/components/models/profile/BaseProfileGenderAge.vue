<template>
  <div
    v-if="gender || age"
  >
    <span
      v-if="gender"
      class="ui mini empty circular label gender-age-item"
      :class="genderLabelColor"
    />

    <span
      v-if="age"
      class="gender-age-item"
      v-text="age"
    />
  </div>
</template>

<script>
import {
  age as formatAge
} from '@/helpers/formatters/dateTimeString'

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
    genderLabelColor () {
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
.gender-age-item
  &:not(:first-child)
    margin-left: 0.3em
</style>
