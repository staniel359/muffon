<template>
  <div class="extra-section">
    <BaseAccordionContainer
      :title="extraText"
    >
      <div class="extra-section-content">
        <BaseImageField
          class="image-field"
          model="profile"
          is-circular
          @change="handleImageChange"
        />

        <div class="extra-fields">
          <BaseProfileGenderField />

          <BaseProfileBirthdateField />

          <BaseProfileCountryField />

          <BaseProfileCityField />

          <BasePrivateField
            model="profile"
          />
        </div>
      </div>
    </BaseAccordionContainer>
  </div>
</template>

<script>
import BaseAccordionContainer
  from '*/components/containers/BaseAccordionContainer.vue'
import BaseImageField from '*/components/fields/BaseImageField.vue'
import BaseProfileGenderField
  from '*/components/fields/profile/BaseProfileGenderField.vue'
import BaseProfileBirthdateField
  from '*/components/fields/profile/BaseProfileBirthdateField.vue'
import BaseProfileCountryField
  from '*/components/fields/profile/BaseProfileCountryField.vue'
import BaseProfileCityField
  from '*/components/fields/profile/BaseProfileCityField.vue'
import BasePrivateField from '*/components/fields/BasePrivateField.vue'

export default {
  name: 'ExtraSection',
  components: {
    BaseAccordionContainer,
    BaseImageField,
    BaseProfileGenderField,
    BaseProfileBirthdateField,
    BaseProfileCountryField,
    BaseProfileCityField,
    BasePrivateField
  },
  emits: [
    'imageChange'
  ],
  computed: {
    extraText () {
      return this.$t(
        'forms.extra'
      )
    }
  },
  methods: {
    handleImageChange (
      value
    ) {
      this.$emit(
        'imageChange',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.extra-section
  margin-bottom: 1em

.extra-section-content
  @extend .d-flex

.image-field
  width: 120px
  margin-right: 1em !important

.extra-fields
  @extend .flex-full
</style>
