<template>
  <component
    :is="listComponent"
    :artists="similar"
    :itemsInRow="4"
  />
</template>

<script>
import BaseArtistsSimpleList from '@/lists/artists/BaseArtistsSimpleList.vue'
import BaseArtistsTableList from '@/lists/artists/BaseArtistsTableList.vue'
import BaseArtistsExtendedList
  from '@/lists/artists/BaseArtistsExtendedList.vue'

export default {
  name: 'SimilarList',
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
    similar: {
      type: Array,
      default () {
        return []
      }
    }
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
      return this.listComponents[this.viewIndex]
    }
  }
}
</script>

<style lang="sass" scoped></style>
