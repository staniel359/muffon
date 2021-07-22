<template>
  <BaseAccordionContainer :title="textFormatted">
    <div class="extra-section">
      <AvatarField
        class="avatar-field"
        @change="handleAvatarChange"
      />

      <div class="extra-fields">
        <GenderField />
        <BirthdateField />
        <CountryField />
        <CityField />
        <div></div>
      </div>
    </div>
  </BaseAccordionContainer>
</template>

<script>
import BaseAccordionContainer from '@/containers/BaseAccordionContainer.vue'
import AvatarField from './ExtraSection/AvatarField.vue'
import GenderField from './ExtraSection/GenderField.vue'
import BirthdateField from './ExtraSection/BirthdateField.vue'
import CountryField from './ExtraSection/CountryField.vue'
import CityField from './ExtraSection/CityField.vue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'ExtraSection',
  components: {
    BaseAccordionContainer,
    AvatarField,
    GenderField,
    BirthdateField,
    CountryField,
    CityField
  },
  emits: [
    'avatarChange'
  ],
  computed: {
    textFormatted () {
      return localize(
        'shared.profile.form.sections.extra'
      )
    }
  },
  methods: {
    handleAvatarChange (value) {
      this.$emit(
        'avatarChange',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.extra-section
  @extend .d-flex

.avatar-field
  margin-right: 1em !important

.extra-fields
  @extend .flex-full
</style>
