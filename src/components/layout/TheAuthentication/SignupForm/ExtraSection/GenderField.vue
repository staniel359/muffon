<template>
  <div class="field">
    <div class="ui selection dropdown">
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
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'GenderField',
  computed: {
    placeholderFormatted () {
      return localize(
        'shared.profile.form.fields.gender'
      )
    },
    maleFormatted () {
      return localize(
        'shared.profile.form.fields.genders.male'
      )
    },
    femaleFormatted () {
      return localize(
        'shared.profile.form.fields.genders.female'
      )
    },
    otherFormatted () {
      return localize(
        'shared.profile.form.fields.genders.other'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
