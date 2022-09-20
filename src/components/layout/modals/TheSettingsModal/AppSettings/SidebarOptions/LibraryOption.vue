<template>
  <div class="option">
    <BaseIcon
      icon="headphones"
    />

    <BaseHeader
      class="option-header"
      tag="h4"
      :text="libraryText"
    />

    <BaseToggle
      store-key="sidebar.isWithLibraryItem"
      :is-checked="isWithLibraryItem"
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
  name: 'LibraryOption',
  components: {
    BaseIcon,
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      'sidebar',
      [
        'isWithLibraryItem'
      ]
    ),
    libraryText () {
      return this.$t(
        'navigation.library'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
