<template>
  <div class="field">
    <div class="image-field-content">
      <BaseImage
        class="image-preview circular bordered"
        model="profile"
        :image="imageUrl"
      />

      <label for="profile-image-input">
        <BaseButton
          class="compact image-add-button"
          :text="addText"
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
        id="profile-image-input"
        @change="handleChange"
      />
    </div>
  </div>
</template>

<script>
import BaseImage from '@/images/BaseImage.vue'
import BaseButton from '@/buttons/BaseButton.vue'
import BaseImageInput from '@/inputs/BaseImageInput.vue'

export default {
  name: 'BaseImageField',
  components: {
    BaseImage,
    BaseButton,
    BaseImageInput
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
    addText () {
      return this.$t(
        'shared.profile.form.fields.image'
      )
    },
    deleteText () {
      return this.$t(
        'buttons.delete'
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
