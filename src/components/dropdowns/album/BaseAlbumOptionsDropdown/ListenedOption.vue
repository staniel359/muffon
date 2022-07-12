<template>
  <BaseListenedDeleteOption
    v-if="listenedId"
    model="album"
    :listened-id="listenedId"
  />
  <AddOption
    v-else
    :artist-name="artistName"
    :album-title="albumTitle"
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
    artistName: String,
    albumTitle: String
  }
}
</script>

<style lang="sass" scoped></style>
