<template>
  <BaseSegmentContainer>
    <BaseMessageCreateFormContainer
      class="main-message-form"
      :profile-id="profileId"
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
        />

        <BaseSubmitButton
          action-key="send"
        />
      </div>
    </BaseMessageCreateFormContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
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
  name: 'FormSegment',
  components: {
    BaseSegmentContainer,
    BaseMessageCreateFormContainer,
    BaseContentField,
    BaseFormImagesSection,
    BaseFormTracksSection,
    BaseFormAddButtonsSection,
    BaseSubmitButton
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
    this.$refs
      .input
      .focus()
  },
  methods: {
    handleSuccess () {
      this.$refs
        .input
        .reset()

      this.tracks = []
      this.images = []

      this.$emit(
        'success'
      )
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
