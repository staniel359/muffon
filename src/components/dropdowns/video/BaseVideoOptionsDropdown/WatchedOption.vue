<template>
  <BaseWatchedDeleteOption
    v-if="watchedId"
    :watched-id="watchedId"
  />
  <AddOption
    v-else
    :video-data="videoData"
  />
</template>

<script>
import BaseWatchedDeleteOption
  from '@/components/dropdowns/options/watched/BaseWatchedDeleteOption.vue'
import AddOption from './WatchedOption/AddOption.vue'

export default {
  name: 'WatchedOption',
  components: {
    BaseWatchedDeleteOption,
    AddOption
  },
  props: {
    watchedId: String,
    videoData: Object
  }
}
</script>

<style lang="sass" scoped></style>
