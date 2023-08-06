<template>
  <div
    ref="item"
    class="item empty-page-item"
    :class="{
      disabled: isDisabled
    }"
  >
    <BaseIcon
      class="small direction-icon"
      icon="dotsHorizontal"
    />
  </div>

  <div class="main-popup-container">
    <BasePageSelectPopup
      ref="popup"
      :total-pages="totalPages"
      @select="handleSelect"
    />
  </div>
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BasePageSelectPopup from '@/components/popups/BasePageSelectPopup.vue'
import pageSelectPopupOptions
  from '@/helpers/formatters/plugins/semantic/options/popup/pageSelect'
import popupMixin from '@/mixins/popupMixin'

export default {
  name: 'EmptyPageItem',
  components: {
    BaseIcon,
    BasePageSelectPopup
  },
  mixins: [
    popupMixin
  ],
  props: {
    totalPages: Number,
    isDisabled: Boolean
  },
  emits: [
    'select'
  ],
  computed: {
    element () {
      return this.$refs.item
    },
    popupOptions () {
      return pageSelectPopupOptions(
        {
          html: this.popup
        }
      )
    }
  },
  methods: {
    handleSelect (
      value
    ) {
      this.$emit(
        'select',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.empty-page-item
  @extend .cursor-pointer
</style>
