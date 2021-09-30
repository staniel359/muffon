<template>
  <div class="field">
    <div class="image-field-content">
      <BasePlaylistImage
        class="image-preview"
        :image="image"
      />

      <label for="playlist-image">
        <BaseButton
          class="compact image-add-button"
          :text="addFormatted"
        />
      </label>

      <BaseButton
        v-if="image"
        class="red basic compact small remove-button"
        icon="close"
        :text="removeFormatted"
        @click="handleRemoveButtonClick"
      />

      <input
        id="playlist-image"
        class="image-input"
        type="file"
        name="image"
        accept="image/jpeg,image/png,image/gif"
        @change="handleChange"
      >
    </div>
  </div>
</template>

<script>
import BasePlaylistImage from '../BasePlaylistImage.vue'
import BaseButton from '@/BaseButton.vue'

export default {
  name: 'BaseImageField',
  components: {
    BasePlaylistImage,
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
      image: null
    }
  },
  computed: {
    addFormatted () {
      return this.$t(
        'shared.playlist.form.fields.image'
      )
    },
    removeFormatted () {
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
    handleChange (event) {
      const file = event.target.files[0]

      if (file) {
        this.image = URL.createObjectURL(file)

        this.convertImage(file)
      }
    },
    handleRemoveButtonClick () {
      this.image = null

      this.$emit(
        'change',
        'DELETED'
      )
    },
    handleValueChange (value) {
      this.image = this.value
    },
    convertImage (file) {
      const reader = new FileReader()

      const handleLoadEnd = event => {
        this.$emit(
          'change',
          event.target.result
        )
      }

      reader.onloadend = handleLoadEnd

      reader.readAsDataURL(file)
    }
  }
}
</script>

<style lang="sass" scoped>
.image-field-content
  @extend .d-flex, .flex-column, .align-items-center

.image-input
  @extend .d-none

.image-preview
  width: 100px
  height: 100px
  margin-bottom: 1em

.image-add-button
  @extend .no-margin

.remove-button
  @extend .no-margin
  margin-top: 0.5em !important
</style>
