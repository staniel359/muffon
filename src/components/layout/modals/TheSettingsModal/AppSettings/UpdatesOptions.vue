<template>
  <div class="main-settings-options-block">
    <CheckNewVersionsOption />

    <AutoupdateOption
      v-if="isAutoupdateAvailable"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import updatesStore from '@/stores/updates'
import CheckNewVersionsOption
  from './UpdatesOptions/CheckNewVersionsOption.vue'
import AutoupdateOption from './UpdatesOptions/AutoupdateOption.vue'

export default {
  name: 'UpdatesOptions',
  components: {
    CheckNewVersionsOption,
    AutoupdateOption
  },
  computed: {
    ...mapState(
      updatesStore,
      [
        'isAutoupdateAvailable'
      ]
    )
  }
}
</script>

<style lang="sass" scoped></style>
