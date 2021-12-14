<template>
  <BaseSegmentContainer>
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
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BaseMessageCreateFormContainer
  from '@/containers/forms/message/BaseMessageCreateFormContainer.vue'
import BaseContentField from '@/fields/BaseContentField.vue'
import BaseFormImagesSection from '@/forms/BaseFormImagesSection.vue'
import BaseFormTracksSection from '@/forms/BaseFormTracksSection.vue'
import BaseFormAddButtonsSection from '@/forms/BaseFormAddButtonsSection.vue'
import BaseMessageSubmitButton
  from '@/models/message/BaseMessageSubmitButton.vue'

export default {
  name: 'FormSegment',
  components: {
    BaseSegmentContainer,
    BaseMessageCreateFormContainer,
    BaseContentField,
    BaseFormImagesSection,
    BaseFormTracksSection,
    BaseFormAddButtonsSection,
    BaseMessageSubmitButton
  },
  props: {
    profileId: String
  },
  emits: [
    'success'
  ],
  data () {
    return {
      tracks: [],
      images: []
    }
  },
  mounted () {
    this.$refs.input.focus()
  },
  methods: {
    handleSuccess () {
      this.$refs.input.reset()

      this.tracks = []
      this.images = []

      this.$emit(
        'success'
      )
    },
    handleTracksChange (value) {
      this.tracks = value
    },
    handleImagesChange (value) {
      this.images = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
