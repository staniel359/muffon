<template>
  <div class="field">
    <div
      ref="checkbox"
      class="ui checkbox"
    >
      <input
        type="checkbox"
        name="legal"
      >

      <label>
        <span
          v-text="agreeText"
        />

        <span
          class="main-link"
          @click.stop="handlePrivacyPolicyTextClick"
          v-text="privacyPolicyText"
        />

        <span
          v-text="andText"
        />

        <span
          class="main-link"
          @click.stop="handleTermsAndConditionsTextClick"
          v-text="termsAndConditionsText"
        />
      </label>
    </div>

    <PrivacyPolicyModal
      ref="privacyPolicyModal"
    />

    <TermsAndConditionsModal
      ref="termsAndConditionsModal"
    />
  </div>
</template>

<script>
import PrivacyPolicyModal from './LegalField/PrivacyPolicyModal.vue'
import TermsAndConditionsModal from './LegalField/TermsAndConditionsModal.vue'
import {
  setCheckbox
} from '*/helpers/actions/plugins/semantic'

export default {
  name: 'LegalField',
  components: {
    PrivacyPolicyModal,
    TermsAndConditionsModal
  },
  computed: {
    agreeText () {
      return this.$t(
        'forms.fields.legal.agree'
      )
    },
    privacyPolicyText () {
      return this.$t(
        'forms.fields.legal.privacyPolicy'
      )
    },
    andText () {
      return this.$t(
        'forms.fields.legal.and'
      )
    },
    termsAndConditionsText () {
      return this.$t(
        'forms.fields.legal.termsAndConditions'
      )
    }
  },
  mounted () {
    setCheckbox(
      this.$refs.checkbox
    )
  },
  methods: {
    handlePrivacyPolicyTextClick () {
      this.$refs
        .privacyPolicyModal
        .show()
    },
    handleTermsAndConditionsTextClick () {
      this.$refs
        .termsAndConditionsModal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
