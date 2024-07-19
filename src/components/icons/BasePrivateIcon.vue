<template>
  <span class="base-private-icon">
    <BaseIcon
      ref="icon"
      v-bind="$attrs"
      class="grey"
      icon="private"
    />

    <div class="main-popup-container">
      <BasePrivatePopup
        ref="popup"
        :model="model"
      />
    </div>
  </span>
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BasePrivatePopup from '@/components/popups/BasePrivatePopup.vue'
import privatePopupOptions
  from '@/helpers/formatters/plugins/semantic/options/popup/source'
import popupMixin from '@/mixins/popupMixin'

export default {
  name: 'BasePrivateIcon',
  components: {
    BaseIcon,
    BasePrivatePopup
  },
  mixins: [
    popupMixin
  ],
  props: {
    model: String
  },
  computed: {
    element () {
      return this.$refs.icon.$el
    },
    popupOptions () {
      return privatePopupOptions(
        {
          html: this.popup
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
