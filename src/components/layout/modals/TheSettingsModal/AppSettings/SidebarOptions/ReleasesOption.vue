<template>
  <div class="option">
    <BaseIcon
      icon="record vinyl"
    />

    <BaseHeader
      class="option-header"
      tag="h4"
      :text="releasesText"
    />

    <BaseToggle
      store-key="sidebar.isWithReleasesItem"
      :is-checked="isWithReleasesItem"
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
  name: 'ReleasesOption',
  components: {
    BaseIcon,
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      'sidebar',
      [
        'isWithReleasesItem'
      ]
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
