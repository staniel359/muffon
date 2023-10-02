<template>
  <BaseIcon
    ref="icon"
    class="grey main-popup-icon absolute no-right no-bottom"
    icon="infoCircle"
  />

  <div class="main-popup-container">
    <BaseProfileInfoPopup
      ref="popup"
      :profile-data="profileData"
    />
  </div>
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseProfileInfoPopup
  from '@/components/popups/profile/BaseProfileInfoPopup.vue'
import popupMixin from '@/mixins/popupMixin'
import profileInfoPopupOptions
  from '@/helpers/formatters/plugins/semantic/options/popup/profileInfo'

export default {
  name: 'InfoSection',
  components: {
    BaseIcon,
    BaseProfileInfoPopup
  },
  mixins: [
    popupMixin
  ],
  props: {
    profileData: Object
  },
  computed: {
    element () {
      return this.$refs.icon.$el
    },
    popupOptions () {
      return profileInfoPopupOptions(
        {
          html: this.popup
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
