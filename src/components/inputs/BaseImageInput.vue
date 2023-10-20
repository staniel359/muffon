<template>
  <input
    ref="input"
    :key="key"
    class="main-system-input"
    type="file"
    name="image"
    accept="image/jpeg,image/png,image/gif"
    @change="handleChange"
  >
</template>

<script>
import {
  generateKey
} from '@/helpers/utils'
import {
  convertBlobToData as convertImageBlobToData
} from '@/helpers/actions/image'

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
    handleChange (
      event
    ) {
      const {
        files
      } = event.target

      const file = files[0]

      if (file) {
        const isImage =
          file.type.startsWith(
            'image/'
          )

        if (isImage) {
          this.processImage(
            file
          )
        }
      }
    },
    show () {
      this.$refs
        .input
        .click()
    },
    async processImage (
      blob
    ) {
      const image =
        await convertImageBlobToData(
          {
            blob
          }
        )

      this.key = generateKey()

      this.$emit(
        'change',
        image
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
