<template>
  <BaseListenedDeleteOption
    v-if="listenedId"
    model="track"
    :listened-id="listenedId"
  />
  <AddOption
    v-else
    :track-data="trackData"
  />
</template>

<script>
import BaseListenedDeleteOption
  from '*/components/dropdowns/options/listened/BaseListenedDeleteOption.vue'
import AddOption from './ListenedOption/AddOption.vue'

export default {
  name: 'ListenedOption',
  components: {
    BaseListenedDeleteOption,
    AddOption
  },
  props: {
    listenedId: String,
    trackData: Object
  }
}
</script>

<style lang="sass" scoped></style>
