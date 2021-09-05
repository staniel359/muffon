<template>
  <div class="field">
    <div class="image-field">
      <BaseProfileImage
        class="image-preview"
        :image="image"
      />

      <label
        class="image-add-button"
        for="image"
      >
        <BaseButton
          class="compact"
          :text="addFormatted"
        />
      </label>

      <BaseButton
        v-if="image"
        class="red basic compact small"
        icon="close"
        :text="removeFormatted"
        @click="handleRemoveButtonClick"
      />

      <input
        id="image"
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
import BaseProfileImage from '@/models/profile/BaseProfileImage.vue'
import BaseButton from '@/BaseButton.vue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'BaseImageField',
  components: {
    BaseProfileImage,
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
      return localize(
        'shared.profile.form.fields.image'
      )
    },
    removeFormatted () {
      return localize(
        'shared.buttons.delete'
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

      this.image = URL.createObjectURL(file)

      this.convertImage(file)
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
.image-field
  @extend .d-flex, .flex-column, .align-items-center

.image-input
  @extend .d-none

.image-preview
  width: 100px
  height: 100px
  margin-bottom: 1em

.image-add-button
  margin-bottom: 0.5em
</style>
