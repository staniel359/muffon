<template>
  <div class="field image-field">
    <div class="image-container">
      <BaseImage
        class="bordered"
        :class="imageClass"
        :model="model"
        :image="imageUrl"
      />

      <BaseClearButton
        v-if="imageUrl"
        class="clear-button"
        @click="handleClearButtonClick"
      />
    </div>

    <BaseImageUploadButton
      class="compact upload-button"
      @change="handleUploadChange"
    />
  </div>
</template>

<script>
import BaseImage from '@/components/images/BaseImage.vue'
import BaseImageUploadButton
  from '@/components/buttons/BaseImageUploadButton.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'

export default {
  name: 'BaseImageField',
  components: {
    BaseImage,
    BaseImageUploadButton,
    BaseClearButton
  },
  props: {
    model: {
      type: String,
      required: true
    },
    value: String,
    isCircular: Boolean
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
    imageClass () {
      if (this.isCircular) {
        return 'circular'
      } else {
        return 'rounded'
      }
    },
    uploadText () {
      return this.$t(
        'actions.upload'
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
    handleUploadChange (
      value
    ) {
      this.imageUrl = value.url

      this.changeImage(
        value
      )
    },
    handleValueChange (
      value
    ) {
      this.imageUrl = this.value
    },
    handleClearButtonClick () {
      this.imageUrl = null

      this.changeImage(
        {
          data: 'DELETED'
        }
      )
    },
    changeImage (
      value
    ) {
      this.$emit(
        'change',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.image-field
  @extend .d-flex, .flex-column, .align-items-center

.image-container
  @extend .relative
  width: 100px
  height: 100px
  &:hover
    .clear-button
      @extend .d-block

.clear-button
  @extend .absolute, .no-margin, .d-none
  top: 5px
  right: 5px

.upload-button
  margin-top: 1em !important
</style>
