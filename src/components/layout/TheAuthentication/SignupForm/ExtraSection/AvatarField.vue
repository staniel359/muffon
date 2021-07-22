<template>
  <div class="field">
    <div class="avatar-field">
      <BaseImage
        class="circular avatar-preview"
        :image="preview"
      />

      <label for="avatar">
        <div class="ui button">
          {{ textFormatted }}
        </div>
      </label>

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
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'AvatarField',
  components: {
    BaseImage
  },
  emits: [
    'change'
  ],
  data () {
    return {
      preview:
        'https://fomantic-ui.com/images' +
        '/wireframe/square-image.png'
    }
  },
  computed: {
    textFormatted () {
      return localize(
        'shared.profile.form.fields.avatar'
      )
    }
  },
  methods: {
    handleChange (event) {
      const file = event.target.files[0]

      this.preview = URL.createObjectURL(file)

      this.convertImage(file)
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
  width: 90px
  height: 90px
  margin-bottom: 10px
</style>
