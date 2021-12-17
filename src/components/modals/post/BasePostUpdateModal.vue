<template>
  <BaseModalContainer ref="modal">
    <div class="scrolling content">
      <BasePostUpdateFormContainer
        class="main-post-form"
        :postId="postId"
        :tracks="tracks"
        :images="images"
        @postDataChange="handlePostDataChange"
      >
        <BaseContentField
          ref="input"
          :value="postContent"
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

          <BaseSubmitButton
            actionKey="save"
          />
        </div>
      </BasePostUpdateFormContainer>
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer from '@/containers/modals/BaseModalContainer.vue'
import BasePostUpdateFormContainer
  from '@/containers/forms/post/BasePostUpdateFormContainer.vue'
import BaseContentField from '@/fields/BaseContentField.vue'
import BaseFormImagesSection from '@/forms/BaseFormImagesSection.vue'
import BaseFormTracksSection from '@/forms/BaseFormTracksSection.vue'
import BaseFormAddButtonsSection from '@/forms/BaseFormAddButtonsSection.vue'
import BaseSubmitButton from '@/buttons/BaseSubmitButton.vue'
import { generateKey } from '#/utils'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'BasePostUpdateModal',
  components: {
    BaseModalContainer,
    BasePostUpdateFormContainer,
    BaseContentField,
    BaseFormImagesSection,
    BaseFormTracksSection,
    BaseFormAddButtonsSection,
    BaseSubmitButton
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
    tracksCollection () {
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

    this.tracks = this.tracksCollection
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
      const url =
        URL.createObjectURL(
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
