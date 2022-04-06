<template>
  <div class="field">
    <div class="image-field-content">
      <BaseImage
        class="rounded bordered image-preview"
        :model="model"
        :image="imageUrl"
      />

      <label for="image-input">
        <BaseButton
          class="basic compact image-add-button"
          icon="image"
          :text="uploadText"
        />
      </label>

      <BaseButton
        v-if="imageUrl"
        class="red basic compact small delete-button"
        icon="close"
        :text="deleteText"
        @click="handleDeleteButtonClick"
      />

      <BaseImageInput
        id="image-input"
        @change="handleChange"
      />
    </div>
  </div>
</template>

<script>
import BaseImage from '*/components/images/BaseImage.vue'
import BaseButton from '*/components/buttons/BaseButton.vue'
import BaseImageInput from '*/components/inputs/BaseImageInput.vue'

export default {
  name: 'BaseImageField',
  components: {
    BaseImage,
    BaseButton,
    BaseImageInput
  },
  props: {
    model: {
      type: String,
      required: true
    },
    value: String
  },
  emits: [
    'change'
  ],
  data () {
    return {
      imageUrl: null
    }
  },
  computed: {
    uploadText () {
      return this.$t(
        'actions.upload'
      )
    },
    deleteText () {
      return this.$t(
        'actions.delete'
      )
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: 'handleValueChange'
    }
  },
  methods: {
    handleValueChange (value) {
      this.imageUrl = this.value
    },
    handleChange (value) {
      this.imageUrl = value.url

      this.changeImage(
        value
      )
    },
    handleDeleteButtonClick () {
      this.imageUrl = null

      this.changeImage({
        data: 'DELETED'
      })
    },
    changeImage (value) {
      this.$emit(
        'change',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.image-field-content
  @extend .d-flex, .flex-column, .align-items-center

.image-preview
  width: 100px
  height: 100px
  margin-bottom: 1em

.image-add-button
  @extend .no-margin

.delete-button
  @extend .no-margin
  margin-top: 0.5em !important
</style>
