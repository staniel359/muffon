<template>
  <BaseButtonContainer
    class="basic compact"
    icon="image"
    @click="handleClick"
  >
    <BaseImageInput
      ref="input"
      @change="handleImageChange"
    />
  </BaseButtonContainer>
</template>

<script>
import BaseButtonContainer
  from '*/components/containers/buttons/BaseButtonContainer.vue'
import BaseImageInput from '*/components/inputs/BaseImageInput.vue'

export default {
  name: 'ImagesButton',
  components: {
    BaseButtonContainer,
    BaseImageInput
  },
  inject: [
    'addModel'
  ],
  methods: {
    handleClick () {
      this.showInput()
    },
    handleImageChange (
      value
    ) {
      this.addModel(
        {
          model: value,
          scope: 'images'
        }
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
