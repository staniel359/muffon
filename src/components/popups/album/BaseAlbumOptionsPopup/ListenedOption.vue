<template>
  <BaseListenedDeleteOption
    v-if="listenedId"
    model="album"
    :listened-id="listenedId"
  />
  <AddOption
    v-else
    :album-data="albumData"
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
    listenedId: Number,
    albumData: Object
  }
}
</script>

<style lang="sass" scoped></style>
