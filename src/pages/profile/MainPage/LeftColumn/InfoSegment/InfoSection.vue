<template>
  <BaseIcon
    ref="icon"
    class="grey info-label"
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
import {
  profileInfo as profileInfoPopupOptions
} from '@/helpers/formatters/plugins/semantic/options/popup'

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

<style lang="sass" scoped>
.info-label
  @extend .absolute, .no-margin, .cursor-pointer
  bottom: 0
  right: 0
  width: 1em
</style>
