<template>
  <div class="main-settings-option">
    <BaseIcon
      icon="savedTrack"
    />

    <BaseHeader
      class="option-header"
      tag="h4"
      :text="savedTracksText"
    />

    <BaseToggle
      store-key="sidebar.isWithSavedTracksItem"
      :is-checked="isSidebarWithSavedTracksItem"
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
  name: 'SavedTracksOption',
  components: {
    BaseIcon,
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      sidebarStore,
      {
        isSidebarWithSavedTracksItem:
          'isWithSavedTracksItem'
      }
    ),
    savedTracksText () {
      return this.$t(
        'navigation.savedTracks'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
