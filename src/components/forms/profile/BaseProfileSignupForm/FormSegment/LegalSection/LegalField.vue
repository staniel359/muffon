<template>
  <div class="field">
    <BaseCheckbox
      name="legal"
    >
      <template #text>
        <span
          v-text="agreeText"
        />

        <PrivacyPolicyText />

        <span
          v-text="andText"
        />

        <TermsAndConditionsText />
      </template>
    </BaseCheckbox>
  </div>
</template>

<script>
import BaseCheckbox from '*/components/BaseCheckbox.vue'
import PrivacyPolicyText from './LegalField/PrivacyPolicyText.vue'
import TermsAndConditionsText from './LegalField/TermsAndConditionsText.vue'

export default {
  name: 'LegalField',
  components: {
    BaseCheckbox,
    PrivacyPolicyText,
    TermsAndConditionsText
  },
  computed: {
    agreeText () {
      return this.$t(
        'forms.fields.legal.agree'
      )
    },
    andText () {
      return this.$t(
        'forms.fields.legal.and'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
