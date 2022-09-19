<template>
  <div class="main-logo-title-section">
    <div class="logo-block">
      <BaseImage
        :image="logo"
      />
    </div>

    <div class="title-block">
      <BaseHeader
        class="title"
        tag="h1"
        text="muffon"
      />
    </div>
  </div>
</template>

<script>
import BaseImage from '*/components/images/BaseImage.vue'
import BaseHeader from '*/components/BaseHeader.vue'

export default {
  name: 'BaseLogoTitleSection',
  components: {
    BaseImage,
    BaseHeader
  },
  computed: {
    logo () {
      return require(
        '*/../public/logo.png'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
