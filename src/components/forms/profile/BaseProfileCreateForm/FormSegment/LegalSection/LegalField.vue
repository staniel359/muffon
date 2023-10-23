<template>
  <div class="field">
    <BaseCheckbox
      name="legal"
    >
      <template
        #text
      >
        <i18n-t
          tag="span"
          scope="global"
          keypath="forms.fields.legal.header"
        >
          <template
            #privacyPolicy
          >
            <LegalTextSection
              scope="privacyPolicy"
            />
          </template>

          <template
            #termsAndConditions
          >
            <LegalTextSection
              scope="termsAndConditions"
            />
          </template>
        </i18n-t>
      </template>
    </BaseCheckbox>
  </div>
</template>

<script>
import BaseCheckbox from '@/components/BaseCheckbox.vue'
import LegalTextSection from './LegalField/LegalTextSection.vue'

export default {
  name: 'LegalField',
  components: {
    BaseCheckbox,
    LegalTextSection
  }
}
</script>

<style lang="sass" scoped></style>
