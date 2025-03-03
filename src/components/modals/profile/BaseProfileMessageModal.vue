<template>
  <BaseModalContainer
    ref="modal"
    size="tiny"
    is-multiple
    @visible="handleVisible"
  >
    <template
      #default="slotProps"
    >
      <div
        class="scrolling content large-padded"
        :class="[
          slotProps.class
        ]"
      >
        <SuccessMessage
          v-if="conversationId"
          :conversation-id="conversationId"
          @link-click="handleLinkClick"
        />
        <template
          v-else
        >
          <OtherProfileSection
            :profile-data="profileData"
          />

          <BaseMessageCreateFormContainer
            class="main-sendable-form"
            :profile-id="profileId"
            :images="images"
            :artists="artists"
            :albums="albums"
            :tracks="tracks"
            @success="handleSuccess"
          >
            <BaseContentField
              ref="content"
              @submit="handleSubmit"
            />

            <BaseSendableFormContentSection
              :images="images"
              :artists="artists"
              :albums="albums"
              :tracks="tracks"
              @link-click="handleLinkClick"
            />

            <div class="buttons-container">
              <BaseFormAddButtonsSection
                :key="key"
                :artists="artists"
                :albums="albums"
                :tracks="tracks"
              />

              <BaseSubmitButton
                ref="submit"
                action-key="send"
              />
            </div>
          </BaseMessageCreateFormContainer>
        </template>
      </div>
    </template>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '@/components/containers/modals/BaseModalContainer.vue'
import SuccessMessage from './BaseProfileMessageModal/SuccessMessage.vue'
import OtherProfileSection
  from './BaseProfileMessageModal/OtherProfileSection.vue'
import BaseMessageCreateFormContainer
  from '@/components/containers/forms/message/BaseMessageCreateFormContainer.vue'
import BaseContentField from '@/components/fields/BaseContentField.vue'
import BaseSendableFormContentSection
  from '@/components/forms/sendable/BaseSendableFormContentSection.vue'
import BaseFormAddButtonsSection
  from '@/components/forms/BaseFormAddButtonsSection.vue'
import BaseSubmitButton from '@/components/buttons/BaseSubmitButton.vue'
import sendableFormMixin from '@/mixins/sendableFormMixin'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'BaseProfileMessageModal',
  components: {
    BaseModalContainer,
    SuccessMessage,
    OtherProfileSection,
    BaseMessageCreateFormContainer,
    BaseContentField,
    BaseSendableFormContentSection,
    BaseFormAddButtonsSection,
    BaseSubmitButton
  },
  mixins: [
    sendableFormMixin
  ],
  props: {
    profileData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      key: null,
      conversationId: null
    }
  },
  computed: {
    profileId () {
      return this.profileData.id
    }
  },
  methods: {
    handleVisible () {
      this.key = generateKey()

      this.focusContent()
    },
    handleSuccess (
      conversationId
    ) {
      this.conversationId = conversationId
    },
    handleLinkClick () {
      this.hide()
    },
    handleSubmit () {
      this.clickSubmit()
    },
    show () {
      this.$refs
        .modal
        .show()
    },
    hide () {
      this.$refs
        .modal
        .hide()
    },
    focusContent () {
      this.$refs
        .content
        ?.focus()
    },
    clickSubmit () {
      this.$refs
        .submit
        .click()
    }
  }
}
</script>

<style lang="sass" scoped></style>
