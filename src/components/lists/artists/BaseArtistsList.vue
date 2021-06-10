<template>
  <Component
    :is="listComponent"
    :artists="artists"
    :itemsInRow="5"
    :isWithListenersCount="isWithListenersCount"
  />
</template>

<script>
import BaseArtistsSimpleList from '@/lists/artists/BaseArtistsSimpleList.vue'
import BaseArtistsTableList from '@/lists/artists/BaseArtistsTableList.vue'
import BaseArtistsExtendedList
  from '@/lists/artists/BaseArtistsExtendedList.vue'

export default {
  name: 'BaseArtistsList',
  components: {
    BaseArtistsSimpleList,
    BaseArtistsTableList,
    BaseArtistsExtendedList
  },
  props: {
    viewIndex: {
      type: Number,
      required: true
    },
    artists: {
      type: Array,
      default () {
        return []
      }
    },
    isWithListenersCount: Boolean
  },
  data () {
    return {
      listComponents: [
        'BaseArtistsSimpleList',
        'BaseArtistsTableList',
        'BaseArtistsExtendedList'
      ]
    }
  },
  computed: {
    listComponent () {
      return this.listComponents[
        this.viewIndex
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>
