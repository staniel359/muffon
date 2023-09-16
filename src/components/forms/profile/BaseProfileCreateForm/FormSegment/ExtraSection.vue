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

          <BaseProfileStatusField
            @submit="handleSubmit"
          />

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
  from '@/components/containers/BaseAccordionContainer.vue'
import BaseImageField from '@/components/fields/BaseImageField.vue'
import BaseProfileGenderField
  from '@/components/fields/profile/BaseProfileGenderField.vue'
import BaseProfileBirthdateField
  from '@/components/fields/profile/BaseProfileBirthdateField.vue'
import BaseProfileCountryField
  from '@/components/fields/profile/BaseProfileCountryField.vue'
import BaseProfileCityField
  from '@/components/fields/profile/BaseProfileCityField.vue'
import BaseProfileStatusField
  from '@/components/fields/profile/BaseProfileStatusField.vue'
import BasePrivateField from '@/components/fields/BasePrivateField.vue'

export default {
  name: 'ExtraSection',
  components: {
    BaseAccordionContainer,
    BaseImageField,
    BaseProfileGenderField,
    BaseProfileBirthdateField,
    BaseProfileCountryField,
    BaseProfileCityField,
    BaseProfileStatusField,
    BasePrivateField
  },
  emits: [
    'imageChange',
    'submit'
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
    },
    handleSubmit () {
      this.$emit(
        'submit'
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
[dir="ltr"]
  .image-field
    margin-right: 1em !important
[dir="rtl"]
  .image-field
    margin-left: 1em !important

.extra-fields
  @extend .flex-full
</style>
