<template>
  <BaseListenedDeleteOption
    v-if="listenedId"
    model="artist"
    :listened-id="listenedId"
  />
  <AddOption
    v-else
    :artist-data="artistData"
  />
</template>

<script>
import BaseListenedDeleteOption
  from '@/components/popups/options/BaseListenedDeleteOption.vue'
import AddOption from './ListenedOption/AddOption.vue'

export default {
  name: 'ListenedOption',
  components: {
    BaseListenedDeleteOption,
    AddOption
  },
  props: {
    listenedId: String,
    artistData: Object
  }
}
</script>

<style lang="sass" scoped></style>
