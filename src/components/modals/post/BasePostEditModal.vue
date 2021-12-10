<template>
  <BaseModalContainer ref="modal">
    <div class="content">
      <BasePostEditFormContainer
        class="main-post-form"
        :postId="postId"
        :tracks="tracks"
        :images="images"
        @postDataChange="handlePostDataChange"
      >
        <BasePostContentField
          ref="input"
          :value="postContent"
        />

        <BasePostImagesSection
          :images="images"
          @imagesChange="handleImagesChange"
        />

        <BasePostTracksSection
          :tracks="tracks"
          @tracksChange="handleTracksChange"
        />

        <div class="buttons-container">
          <BasePostAddButtonsSection
            :tracks="tracks"
            :images="images"
            @tracksChange="handleTracksChange"
            @imagesChange="handleImagesChange"
          />

          <BasePostSubmitButton
            class="submit-button"
          />
        </div>
      </BasePostEditFormContainer>
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer from '@/containers/modals/BaseModalContainer.vue'
import BasePostEditFormContainer
  from '@/containers/forms/post/BasePostEditFormContainer.vue'
import BasePostContentField from '@/models/post/BasePostContentField.vue'
import BasePostImagesSection from '@/models/post/BasePostImagesSection.vue'
import BasePostTracksSection from '@/models/post/BasePostTracksSection.vue'
import BasePostAddButtonsSection
  from '@/models/post/BasePostAddButtonsSection.vue'
import BasePostSubmitButton from '@/models/post/BasePostSubmitButton.vue'
import { generateKey } from '#/utils'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'BasePostEditModal',
  components: {
    BaseModalContainer,
    BasePostEditFormContainer,
    BasePostContentField,
    BasePostImagesSection,
    BasePostTracksSection,
    BasePostAddButtonsSection,
    BasePostSubmitButton
  },
  props: {
    postData: {
      type: Object,
      required: true
    }
  },
  emits: [
    'updated'
  ],
  data () {
    return {
      tracks: [],
      images: []
    }
  },
  computed: {
    postId () {
      return this.postData.id.toString()
    },
    postContent () {
      return this.postData.content
    },
    postImages () {
      return this.postData.images || []
    },
    tracksFormatted () {
      return formatCollection(
        this.postTracks
      )
    },
    postTracks () {
      return this.postData.tracks || []
    }
  },
  mounted () {
    this.postImages.forEach(
      this.processImage
    )

    this.tracks = this.tracksFormatted
  },
  methods: {
    handleTracksChange (value) {
      this.tracks = value
    },
    handleImagesChange (value) {
      this.images = value
    },
    handlePostDataChange (value) {
      this.$emit(
        'updated',
        value
      )
    },
    handleImageLoadEnd ({ reader, file }) {
      const url = URL.createObjectURL(
        file
      )

      const image = {
        uuid: generateKey(),
        url,
        data: reader.result
      }

      this.images.push(
        image
      )
    },
    async processImage (imageData) {
      const data = await fetch(
        imageData.original
      )

      const file = await data.blob()

      const reader = new FileReader()

      reader.onloadend = () => {
        this.handleImageLoadEnd({
          reader, file
        })
      }

      reader.readAsDataURL(file)
    },
    show () {
      this.$refs.modal.show()
    },
    hide () {
      this.$refs.modal.hide()
    }
  }
}
</script>

<style lang="sass" scoped></style>
