<template>
  <div class="option">
    <BaseIcon
      icon="broadcast tower"
    />

    <BaseHeader
      class="option-header"
      tag="h4"
      :text="radioText"
    />

    <BaseToggle
      store-key="sidebar.isWithRadioItem"
      :is-checked="isWithRadioItem"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseIcon from '@/components/BaseIcon.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/BaseToggle.vue'

export default {
  name: 'RadioOption',
  components: {
    BaseIcon,
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      'sidebar',
      [
        'isWithRadioItem'
      ]
    ),
    radioText () {
      return this.$t(
        'navigation.radio'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
