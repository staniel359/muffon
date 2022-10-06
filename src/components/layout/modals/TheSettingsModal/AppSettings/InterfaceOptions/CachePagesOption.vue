<template>
  <div class="option">
    <BaseHeader
      class="option-header"
      tag="h4"
      :text="cachePagesText"
    />

    <BaseToggle
      store-key="layout.isCachePages"
      :is-checked="isCachePages"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'CachePagesOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      'layout',
      [
        'isCachePages'
      ]
    ),
    cachePagesText () {
      return this.$t(
        'settings.options.app.interface.cachePages'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
