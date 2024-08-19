<template>
  <div class="main-settings-options-block">
    <CacheOption />

    <ClearCacheOption />

    <AutoupdateOption
      v-if="isAutoupdateAvailable"
    />
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
        'isAutoupdateAvailable'
      ]
    )
  }
}
</script>

<style lang="sass" scoped></style>
