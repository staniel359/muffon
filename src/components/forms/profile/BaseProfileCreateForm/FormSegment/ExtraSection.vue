<template>
  <div class="main-bottom-section">
    <BaseAccordionContainer
      :title="extraText"
    >
      <div class="main-form-extra-section">
        <BaseImageField
          model="profile"
          is-circular
          @change="handleImageChange"
        />

        <div class="main-form-extra-section-fields-section">
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

<style lang="sass" scoped></style>
