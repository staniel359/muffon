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
          :tracks="tracks"
          :images="images"
          @success="handleSuccess"
        >
          <BaseContentField
            ref="content"
            @submit="handleSubmit"
          />

          <div
            v-if="images.length || tracks.length"
            class="images-tracks-section"
          >
            <BaseFormImagesSection
              v-if="images.length"
              :images="images"
              @images-change="handleImagesChange"
            />

            <BaseFormTracksSection
              v-if="tracks.length"
              :tracks="tracks"
              @tracks-change="handleTracksChange"
            />
          </div>

          <div class="buttons-container">
            <BaseFormAddButtonsSection
              :tracks="tracks"
              :images="images"
              @tracks-change="handleTracksChange"
              @images-change="handleImagesChange"
              @emoji-select="handleEmojiSelect"
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
import BaseFormImagesSection
  from '*/components/forms/BaseFormImagesSection.vue'
import BaseFormTracksSection
  from '*/components/forms/BaseFormTracksSection.vue'
import BaseFormAddButtonsSection
  from '*/components/forms/BaseFormAddButtonsSection.vue'
import BaseSubmitButton from '*/components/buttons/BaseSubmitButton.vue'

export default {
  name: 'BaseProfileMessageModal',
  components: {
    BaseModalContainer,
    SuccessMessage,
    OtherProfileSection,
    BaseMessageCreateFormContainer,
    BaseContentField,
    BaseFormImagesSection,
    BaseFormTracksSection,
    BaseFormAddButtonsSection,
    BaseSubmitButton
  },
  props: {
    profileData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      conversationId: null,
      tracks: [],
      images: []
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
    handleTracksChange (
      value
    ) {
      this.tracks = value
    },
    handleImagesChange (
      value
    ) {
      this.images = value
    },
    handleEmojiSelect (
      value
    ) {
      this.updateContentValue(
        value
      )
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
    },
    updateContentValue (
      value
    ) {
      this.$refs
        .content
        .updateValue(
          value
        )
    }
  }
}
</script>

<style lang="sass" scoped></style>
