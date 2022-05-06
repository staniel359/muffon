<template>
  <BaseModalContainer
    ref="modal"
    @visible="handleVisible"
  >
    <div class="scrolling content">
      <BasePostUpdateFormContainer
        class="main-post-form"
        :post-data="postData"
        :tracks="tracks"
        :images="images"
        @success="handleSuccess"
      >
        <BaseContentField
          ref="content"
          :value="postContent"
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
            :is-checked="isByCommunity"
          />

          <BaseSubmitButton
            ref="submit"
            action-key="save"
          />
        </div>
      </BasePostUpdateFormContainer>
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '*/components/containers/modals/BaseModalContainer.vue'
import BasePostUpdateFormContainer
  from '*/components/containers/forms/post/BasePostUpdateFormContainer.vue'
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
import {
  generateKey
} from '*/helpers/utils'
import {
  collection as formatCollection
} from '*/helpers/formatters'

export default {
  name: 'BasePostUpdateModal',
  components: {
    BaseModalContainer,
    BasePostUpdateFormContainer,
    BaseContentField,
    BaseFormImagesSection,
    BaseFormTracksSection,
    BaseFormAddButtonsSection,
    BasePostAsCommunityField,
    BaseSubmitButton
  },
  props: {
    postData: {
      type: Object,
      required: true
    },
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
  computed: {
    postContent () {
      return this.postData.content
    },
    postImages () {
      return this.postData.images || []
    },
    tracksCollection () {
      return formatCollection(
        this.postTracks
      )
    },
    postTracks () {
      return this.postData.tracks || []
    },
    isByCommunity () {
      return this.postData.by_community
    }
  },
  mounted () {
    this.postImages.forEach(
      this.processImage
    )

    this.tracks = this.tracksCollection
  },
  methods: {
    handleVisible () {
      this.focusContent()
    },
    handleSubmit () {
      this.clickSubmit()
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
    handleSuccess (
      value
    ) {
      this.$emit(
        'success',
        value
      )
    },
    handleImageLoadEnd (
      {
        reader,
        file
      }
    ) {
      const url =
        URL.createObjectURL(
          file
        )

      const imageData = {
        uuid: generateKey(),
        url,
        data: reader.result
      }

      this.images.push(
        imageData
      )
    },
    async processImage (
      imageData
    ) {
      const data = await fetch(
        imageData.original
      )

      const file = await data.blob()

      const reader = new FileReader()

      reader.onloadend = () => {
        this.handleImageLoadEnd(
          {
            reader,
            file
          }
        )
      }

      reader.readAsDataURL(
        file
      )
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
