<template>
  <div class="main-settings-options-block">
    <AutoupdateOption
      v-if="isAutoupdateSupported"
    />

    <CacheOption />

    <ClearCacheOption />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import systemStore from '@/stores/system'
import CacheOption from './SystemOptions/CacheOption.vue'
import ClearCacheOption from './SystemOptions/ClearCacheOption.vue'
import AutoupdateOption from './SystemOptions/AutoupdateOption.vue'

export default {
  name: 'SystemOptions',
  components: {
    CacheOption,
    ClearCacheOption,
    AutoupdateOption
  },
  computed: {
    ...mapState(
      systemStore,
      [
        'isAutoupdateSupported'
      ]
    )
  }
}
</script>

<style lang="sass" scoped></style>
