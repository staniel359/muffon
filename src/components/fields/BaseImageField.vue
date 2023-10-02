<template>
  <div class="field main-form-image-field">
    <div class="main-image-container">
      <BaseImage
        :class="imageClass"
        :model="model"
        :image="imageUrl"
      />

      <BaseClearButton
        v-if="imageUrl"
        class="main-image-clear-button"
        @click="handleClearButtonClick"
      />
    </div>

    <div class="main-bottom-section">
      <BaseImageUploadButton
        class="compact"
        @change="handleUploadChange"
      />
    </div>
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
          data: null
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

<style lang="sass" scoped></style>
