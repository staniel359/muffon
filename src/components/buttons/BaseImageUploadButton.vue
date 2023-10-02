<template>
  <BaseButtonContainer
    class="basic circular"
    left-icon="image"
    :text="uploadText"
    @click="handleClick"
  >
    <BaseImageInput
      ref="input"
      @change="handleChange"
    />
  </BaseButtonContainer>
</template>

<script>
import BaseButtonContainer
  from '@/components/containers/buttons/BaseButtonContainer.vue'
import BaseImageInput from '@/components/inputs/BaseImageInput.vue'

export default {
  name: 'BaseImageUploadButton',
  components: {
    BaseButtonContainer,
    BaseImageInput
  },
  props: {
    isWithText: {
      type: Boolean,
      default: true
    }
  },
  emits: [
    'change'
  ],
  computed: {
    uploadText () {
      if (this.isWithText) {
        return this.$t(
          'actions.upload'
        )
      } else {
        return null
      }
    }
  },
  methods: {
    handleClick () {
      this.showInput()
    },
    handleChange (
      value
    ) {
      this.$emit(
        'change',
        value
      )
    },
    showInput () {
      this.$refs
        .input
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
