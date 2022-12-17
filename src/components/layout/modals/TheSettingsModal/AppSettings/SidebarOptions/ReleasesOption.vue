<template>
  <div class="option">
    <BaseIcon
      icon="release"
    />

    <BaseHeader
      class="option-header"
      tag="h4"
      :text="releasesText"
    />

    <BaseToggle
      store-key="sidebar.isWithReleasesItem"
      :is-checked="isSidebarWithReleasesItem"
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
  name: 'ReleasesOption',
  components: {
    BaseIcon,
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      sidebarStore,
      {
        isSidebarWithReleasesItem:
          'isWithReleasesItem'
      }
    ),
    releasesText () {
      return this.$t(
        'navigation.releases'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
