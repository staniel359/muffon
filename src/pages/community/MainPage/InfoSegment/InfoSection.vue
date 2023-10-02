<template>
  <div class="main-bottom-extrasmall-section">
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
  </div>
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseCommunityInfoPopup
  from '@/components/popups/community/BaseCommunityInfoPopup.vue'
import popupMixin from '@/mixins/popupMixin'
import communityInfoPopupOptions
  from '@/helpers/formatters/plugins/semantic/options/popup/communityInfo'

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

<style lang="sass" scoped></style>
