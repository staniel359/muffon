<template>
  <div class="option">
    <BaseIcon
      icon="tags"
    />

    <BaseHeader
      class="option-header"
      tag="h4"
      :text="multitagText"
    />

    <BaseToggle
      store-key="sidebar.isWithMultitagItem"
      :is-checked="isWithMultitagItem"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'MultitagOption',
  components: {
    BaseIcon,
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      'sidebar',
      [
        'isWithMultitagItem'
      ]
    ),
    multitagText () {
      return this.$t(
        'navigation.multitag'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
