<template>
  <div class="field">
    <BaseCheckbox
      name="legal"
    >
      <template #text>
        <i18n-t
          tag="span"
          keypath="forms.fields.legal.header"
        >
          <template
            #privacyPolicy
          >
            <PrivacyPolicyText />
          </template>

          <template
            #termsAndConditions
          >
            <TermsAndConditionsText />
          </template>
        </i18n-t>
      </template>
    </BaseCheckbox>
  </div>
</template>

<script>
import BaseCheckbox from '@/components/BaseCheckbox.vue'
import PrivacyPolicyText from './LegalField/PrivacyPolicyText.vue'
import TermsAndConditionsText from './LegalField/TermsAndConditionsText.vue'

export default {
  name: 'LegalField',
  components: {
    BaseCheckbox,
    PrivacyPolicyText,
    TermsAndConditionsText
  }
}
</script>

<style lang="sass" scoped></style>
