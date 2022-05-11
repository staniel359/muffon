<template>
  <BaseModalContainer
    ref="modal"
    @visible="handleVisible"
  >
    <div class="scrolling content">
      <SuccessMessage
        v-if="conversationId"
        :conversation-id="conversationId"
        @link-click="handleLinkClick"
      />
      <template v-else>
        <OtherProfileSection
          :profile-data="profileData"
        />

        <BaseMessageCreateFormContainer
          class="main-message-form"
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
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '*/components/containers/modals/BaseModalContainer.vue'
import SuccessMessage from './BaseProfileMessageModal/SuccessMessage.vue'
import OtherProfileSection
  from './BaseProfileMessageModal/OtherProfileSection.vue'
import BaseMessageCreateFormContainer
  from '*/components/containers/forms/message/BaseMessageCreateFormContainer.vue'
import BaseContentField from '*/components/fields/BaseContentField.vue'
import BaseSendableFormContentSection
  from '*/components/forms/sendable/BaseSendableFormContentSection.vue'
import BaseFormAddButtonsSection
  from '*/components/forms/BaseFormAddButtonsSection.vue'
import BaseSubmitButton from '*/components/buttons/BaseSubmitButton.vue'
import sendableFormMixin from '*/mixins/sendableFormMixin'

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
      conversationId: null
    }
  },
  computed: {
    profileId () {
      return this.profileData.id.toString()
    }
  },
  methods: {
    handleVisible () {
      this.focusContent()
    },
    handleSuccess (
      conversationId
    ) {
      this.conversationId =
        conversationId.toString()
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
        .focus()
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
