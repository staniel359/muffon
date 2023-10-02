<template>
  <div class="main-right-small-section">
    <BaseIcon
      ref="icon"
      class="grey main-popup-icon"
      icon="infoCircle"
    />

    <div class="main-popup-container">
      <BaseLastfmImportInfoPopup
        ref="popup"
      />
    </div>
  </div>
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseLastfmImportInfoPopup
  from '@/components/popups/import/BaseLastfmImportInfoPopup.vue'
import popupMixin from '@/mixins/popupMixin'
import lastfmImportInfoPopupOptions
  from '@/helpers/formatters/plugins/semantic/options/popup/lastfmImportInfo'

export default {
  name: 'LastfmInfoSection',
  components: {
    BaseIcon,
    BaseLastfmImportInfoPopup
  },
  mixins: [
    popupMixin
  ],
  computed: {
    element () {
      return this.$refs.icon.$el
    },
    popupOptions () {
      return lastfmImportInfoPopupOptions(
        {
          html: this.popup
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
