<template>
  <div class="main-settings-option">
    <BaseIcon
      icon="community"
    />

    <BaseHeader
      class="option-header"
      tag="h4"
      :text="communitiesText"
    />

    <BaseToggle
      store-key="sidebar.isWithCommunitiesItem"
      :is-checked="isSidebarWithCommunitiesItem"
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
  name: 'CommunitiesOption',
  components: {
    BaseIcon,
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      sidebarStore,
      {
        isSidebarWithCommunitiesItem:
          'isWithCommunitiesItem'
      }
    ),
    communitiesText () {
      return this.$t(
        'navigation.communities'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
