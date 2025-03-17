<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
      />

      <UploadButton />
    </div>

    <div class="main-bottom-section">
      <BaseBackgroundImagesTableList />
    </div>
  </div>
</template>

<script>
import BaseSettingsOptionHeader
  from '@/components/headers/settings/BaseSettingsOptionHeader.vue'
import UploadButton from './BackgroundOption/UploadButton.vue'
import BaseBackgroundImagesTableList
  from '@/components/lists/backgroundImages/BaseBackgroundImagesTableList.vue'

export default {
  name: 'BackgroundOption',
  components: {
    BaseSettingsOptionHeader,
    UploadButton,
    BaseBackgroundImagesTableList
  },
  computed: {
    optionText () {
      return this.$t(
        'settings.options.app.theme.background'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
