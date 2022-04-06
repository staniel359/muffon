<template>
  <BaseSegmentContainer>
    <BasePostCreateFormContainer
      class="main-post-form"
      :postType="postType"
      :profileId="profileId"
      :communityId="communityId"
      :tracks="tracks"
      :images="images"
      @success="handleSuccess"
    >
      <BaseContentField
        ref="input"
        @submit="handleSubmit"
      />

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

        <BasePostAsCommunityField
          v-if="isWithAsCommunityOption"
        />

        <BaseSubmitButton
          ref="submit"
          actionKey="post"
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
      this.$refs.submit.click()
    },
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
