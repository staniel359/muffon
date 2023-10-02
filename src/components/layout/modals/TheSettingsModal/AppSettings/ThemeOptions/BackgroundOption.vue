<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="backgroundText"
      />

      <UploadButton />
    </div>

    <div class="main-bottom-section">
      <BaseBackgroundImagesTableList />
    </div>
  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue'
import UploadButton from './BackgroundOption/UploadButton.vue'
import BaseBackgroundImagesTableList
  from '@/components/lists/backgroundImages/BaseBackgroundImagesTableList.vue'

export default {
  name: 'BackgroundOption',
  components: {
    BaseHeader,
    UploadButton,
    BaseBackgroundImagesTableList
  },
  computed: {
    backgroundText () {
      return this.$t(
        'settings.options.app.theme.background'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
