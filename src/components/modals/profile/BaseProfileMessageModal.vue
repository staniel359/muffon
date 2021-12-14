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

            <BaseMessageSubmitButton
              class="submit-button"
            />
          </div>
        </BaseMessageCreateFormContainer>
      </template>
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer from '@/containers/modals/BaseModalContainer.vue'
import SuccessMessage from './BaseProfileMessageModal/SuccessMessage.vue'
import OtherProfileSection
  from './BaseProfileMessageModal/OtherProfileSection.vue'
import BaseMessageCreateFormContainer
  from '@/containers/forms/message/BaseMessageCreateFormContainer.vue'
import BaseContentField from '@/fields/BaseContentField.vue'
import BaseFormImagesSection from '@/forms/BaseFormImagesSection.vue'
import BaseFormTracksSection from '@/forms/BaseFormTracksSection.vue'
import BaseFormAddButtonsSection from '@/forms/BaseFormAddButtonsSection.vue'
import BaseMessageSubmitButton
  from '@/models/message/BaseMessageSubmitButton.vue'

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
    BaseMessageSubmitButton
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
