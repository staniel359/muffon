<template>
  <div
    v-if="gender || age"
  >
    <div
      v-if="gender"
      class="ui tiny empty circular label gender-block"
      :class="genderLabelColor"
    />

    <div
      v-if="gender && age"
      class="gender-age-separator"
    />

    <div
      v-if="age"
      class="age-block"
      v-text="age"
    />
  </div>
</template>

<script>
import {
  age as formatAge
} from '@/helpers/formatters'

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
.gender-block
  @extend .no-margin, .d-inline-block

.gender-age-separator
  @extend .d-inline-block
  width: 0.4em

.age-block
  @extend .d-inline-block
</style>
