<template>
  <BaseSegmentContainer>
    <BasePostCreateFormContainer
      class="main-post-form"
      :post-type="postType"
      :profile-id="profileId"
      :community-id="communityId"
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

        <BasePostAsCommunityField
          v-if="isWithAsCommunityOption"
        />

        <BaseSubmitButton
          ref="submit"
          action-key="post"
        />
      </div>
    </BasePostCreateFormContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BasePostCreateFormContainer
  from '*/components/containers/forms/post/BasePostCreateFormContainer.vue'
import BaseContentField from '*/components/fields/BaseContentField.vue'
import BaseFormImagesSection
  from '*/components/forms/BaseFormImagesSection.vue'
import BaseFormTracksSection
  from '*/components/forms/BaseFormTracksSection.vue'
import BaseFormAddButtonsSection
  from '*/components/forms/BaseFormAddButtonsSection.vue'
import BasePostAsCommunityField
  from '*/components/fields/post/BasePostAsCommunityField.vue'
import BaseSubmitButton from '*/components/buttons/BaseSubmitButton.vue'

export default {
  name: 'BasePostsFormSegment',
  components: {
    BaseSegmentContainer,
    BasePostCreateFormContainer,
    BaseContentField,
    BaseFormImagesSection,
    BaseFormTracksSection,
    BaseFormAddButtonsSection,
    BasePostAsCommunityField,
    BaseSubmitButton
  },
  props: {
    postType: String,
    profileId: String,
    communityId: String,
    isWithAsCommunityOption: Boolean
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
  methods: {
    handleSubmit () {
      this.clickSubmit()
    },
    handleSuccess () {
      this.resetContent()

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
    },
    handleEmojiSelect (
      value
    ) {
      this.updateContentValue(
        value
      )
    },
    clickSubmit () {
      this.$refs
        .submit
        .click()
    },
    resetContent () {
      this.$refs
        .content
        .reset()
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
