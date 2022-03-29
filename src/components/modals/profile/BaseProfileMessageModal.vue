<template>
  <BaseModalContainer ref="modal">
    <div class="scrolling content">
      <SuccessMessage
        v-if="conversationId"
        :conversationId="conversationId"
        @linkClick="handleLinkClick"
      />
      <template v-else>
        <OtherProfileSection
          :profileData="profileData"
        />

        <BaseMessageCreateFormContainer
          class="main-message-form"
          :profileId="profileId"
          :tracks="tracks"
          :images="images"
          @success="handleSuccess"
        >
          <BaseContentField ref="input" />

          <div
            v-if="images.length || tracks.length"
            class="images-tracks-section"
          >
            <BaseFormImagesSection
              v-if="images.length"
              :images="images"
              @imagesChange="handleImagesChange"
            />

            <BaseFormTracksSection
              v-if="tracks.length"
              :tracks="tracks"
              @tracksChange="handleTracksChange"
            />
          </div>

          <div class="buttons-container">
            <BaseFormAddButtonsSection
              :tracks="tracks"
              :images="images"
              @tracksChange="handleTracksChange"
              @imagesChange="handleImagesChange"
            />

            <BaseSubmitButton
              actionKey="send"
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
    handleSuccess (conversationId) {
      this.conversationId =
        conversationId.toString()
    },
    handleLinkClick () {
      this.$refs.modal.hide()
    },
    handleTracksChange (value) {
      this.tracks = value
    },
    handleImagesChange (value) {
      this.images = value
    },
    show () {
      this.$refs.modal.show()

      this.$refs.input.focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
