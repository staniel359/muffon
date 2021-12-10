<template>
  <div class="field">
    <div
      class="ui selection dropdown"
      ref="dropdown"
    >
      <input
        type="hidden"
        name="gender"
      >

      <div class="default text">
        {{ placeholderFormatted }}
      </div>
      <i class="dropdown icon"></i>

      <div class="menu">
        <div class="item" data-value="male">
          {{ maleFormatted }}
        </div>
        <div class="item" data-value="female">
          {{ femaleFormatted }}
        </div>
        <div class="item" data-value="other">
          {{ otherFormatted }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setDropdownValue } from '#/actions/plugins/semantic'

export default {
  name: 'BaseProfileGenderField',
  props: {
    value: String
  },
  computed: {
    placeholderFormatted () {
      return this.$t(
        'shared.profile.form.fields.gender'
      )
    },
    maleFormatted () {
      return this.$t(
        'shared.profile.form.fields.genders.male'
      )
    },
    femaleFormatted () {
      return this.$t(
        'shared.profile.form.fields.genders.female'
      )
    },
    otherFormatted () {
      return this.$t(
        'shared.profile.form.fields.genders.other'
      )
    }
  },
  mounted () {
    setDropdownValue(
      this.$refs.dropdown,
      this.value
    )
  }
}
</script>

<style lang="sass" scoped></style>
