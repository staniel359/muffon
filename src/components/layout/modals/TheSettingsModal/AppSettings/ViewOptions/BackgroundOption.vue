<template>
  <div class="option">
    <BaseHeader
      class="option-header"
      tag="h4"
      :text="backgroundText"
    />

    <UploadButton />
  </div>

  <ImagesSection />
</template>

<script>
import BaseHeader from '*/components/BaseHeader.vue'
import UploadButton from './BackgroundOption/UploadButton.vue'
import ImagesSection from './BackgroundOption/ImagesSection.vue'

export default {
  name: 'BackgroundOption',
  components: {
    BaseHeader,
    UploadButton,
    ImagesSection
  },
  computed: {
    backgroundText () {
      return this.$t(
        'settings.options.app.view.background'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
