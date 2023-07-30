<template>
  <BaseIcon
    ref="icon"
    class="grey main-popup-icon"
    icon="infoCircle"
  />

  <div class="main-popup-container">
    <BaseCommunityInfoPopup
      ref="popup"
      :community-data="communityData"
    />
  </div>
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseCommunityInfoPopup
  from '@/components/popups/community/BaseCommunityInfoPopup.vue'
import popupMixin from '@/mixins/popupMixin'
import {
  communityInfo as communityInfoPopupOptions
} from '@/helpers/formatters/plugins/semantic/options/popup'

export default {
  name: 'InfoSection',
  components: {
    BaseIcon,
    BaseCommunityInfoPopup
  },
  mixins: [
    popupMixin
  ],
  props: {
    communityData: Object
  },
  computed: {
    element () {
      return this.$refs.icon.$el
    },
    popupOptions () {
      return communityInfoPopupOptions(
        {
          html: this.popup
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.main-popup-icon
  margin-top: 0.5em !important
</style>
