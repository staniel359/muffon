<template>
  <div class="field">
    <div class="avatar-field">
      <BaseImage
        class="circular bordered avatar-preview"
        :image="image"
      />

      <label
        class="avatar-add-button"
        for="avatar"
      >
        <BaseButton
          class="compact"
          :text="addFormatted"
        />
      </label>

      <BaseButton
        class="red compact"
        :text="removeFormatted"
        @click="handleRemoveButtonClick"
      />

      <input
        id="avatar"
        class="avatar-input"
        type="file"
        name="avatar"
        accept="image/jpeg,image/png,image/gif"
        @change="handleChange"
      >
    </div>
  </div>
</template>

<script>
import BaseImage from '@/BaseImage.vue'
import BaseButton from '@/BaseButton.vue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'AvatarField',
  components: {
    BaseImage,
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
      preview: null,
      defaultImage:
        'https://fomantic-ui.com/images' +
        '/wireframe/square-image.png'
    }
  },
  computed: {
    image () {
      return (
        this.preview ||
          this.defaultImage
      )
    },
    addFormatted () {
      return localize(
        'shared.profile.form.fields.avatar.add'
      )
    },
    removeFormatted () {
      return localize(
        'shared.profile.form.fields.avatar.remove'
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

      this.preview = URL.createObjectURL(file)

      this.convertImage(file)
    },
    handleRemoveButtonClick () {
      this.preview = null

      this.$emit(
        'change',
        'DELETED'
      )
    },
    handleValueChange (value) {
      this.preview = this.value
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
.avatar-field
  @extend .d-flex, .flex-column, .align-items-center

.avatar-input
  @extend .d-none

.avatar-preview
  @extend .object-fit-cover
  width: 100px
  height: 100px
  margin-bottom: 15px

.avatar-add-button
  margin-bottom: 10px
</style>
