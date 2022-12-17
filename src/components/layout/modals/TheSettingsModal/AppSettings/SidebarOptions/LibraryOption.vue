<template>
  <div class="option">
    <BaseIcon
      icon="library"
    />

    <BaseHeader
      class="option-header"
      tag="h4"
      :text="libraryText"
    />

    <BaseToggle
      store-key="sidebar.isWithLibraryItem"
      :is-checked="isSidebarWithLibraryItem"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import sidebarStore from '@/stores/sidebar'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'LibraryOption',
  components: {
    BaseIcon,
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      sidebarStore,
      {
        isSidebarWithLibraryItem:
          'isWithLibraryItem'
      }
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
