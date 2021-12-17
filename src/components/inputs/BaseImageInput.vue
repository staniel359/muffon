<template>
  <input
    class="main-image-input"
    type="file"
    name="image"
    accept="image/jpeg,image/png,image/gif"
    :key="key"
    @change="handleChange"
  >
</template>

<script>
import { generateKey } from '#/utils'

export default {
  name: 'BaseImageInput',
  emits: [
    'change'
  ],
  data () {
    return {
      key: null
    }
  },
  methods: {
    handleChange (event) {
      const { files } = event.target

      const file = files[0]

      if (file) {
        this.processImage(
          file
        )
      }
    },
    handleLoadEnd ({ reader, file }) {
      const url =
        URL.createObjectURL(
          file
        )

      const image = {
        uuid: generateKey(),
        url,
        data: reader.result
      }

      this.key = generateKey()

      this.$emit(
        'change',
        image
      )
    },
    processImage (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        this.handleLoadEnd({
          reader, file
        })
      }

      reader.readAsDataURL(file)
    }
  }
}
</script>

<style lang="sass" scoped></style>
