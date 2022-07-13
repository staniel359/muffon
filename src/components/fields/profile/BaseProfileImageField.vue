<template>
  <div class="field">
    <div class="image-field-content">
      <BaseImage
        class="image-preview circular bordered"
        model="profile"
        :image="imageUrl"
      />

      <BaseImageUploadButton
        @change="handleUploadChange"
      />

      <BaseButton
        v-if="imageUrl"
        class="red basic compact small delete-button"
        icon="trash alternate outline"
        :text="deleteText"
        @click="handleDeleteButtonClick"
      />
    </div>
  </div>
</template>

<script>
import BaseImage from '*/components/images/BaseImage.vue'
import BaseImageUploadButton
  from '*/components/buttons/BaseImageUploadButton.vue'
import BaseButton from '*/components/buttons/BaseButton.vue'

export default {
  name: 'BaseProfileImageField',
  components: {
    BaseImage,
    BaseImageUploadButton,
    BaseButton
  },
  props: {
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
    handleDeleteButtonClick () {
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
.image-field-content
  @extend .d-flex, .flex-column, .align-items-center

.image-preview
  width: 100px
  height: 100px
  margin-bottom: 1em

.delete-button
  margin-top: 0.5em !important
</style>
