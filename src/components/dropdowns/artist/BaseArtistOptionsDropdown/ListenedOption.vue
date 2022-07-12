<template>
  <BaseListenedDeleteOption
    v-if="listenedId"
    model="artist"
    :listened-id="listenedId"
  />
  <AddOption
    v-else
    :artist-name="artistName"
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
    artistName: String
  }
}
</script>

<style lang="sass" scoped></style>
