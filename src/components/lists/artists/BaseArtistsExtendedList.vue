<template>
  <div class="ui horizontal cards">
    <ArtistItem
      v-for="artistData in artistsFormatted"
      :key="artistData.uuid"
      :artistName="artistData.name"
      @init="handleItemInit"
      @loadEnd="handleItemLoadEnd"
    />
  </div>
</template>

<script>
import ArtistItem from './BaseArtistsExtendedList/ArtistItem.vue'
import { collection as formatCollection } from '#/formatters'
import { refreshVisibility } from '#/actions/plugins/semantic'

export default {
  name: 'BaseArtistsExtendedList',
  components: {
    ArtistItem
  },
  props: {
    artists: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      items: []
    }
  },
  computed: {
    artistsFormatted () {
      return formatCollection(this.artists)
    }
  },
  watch: {
    artists: 'handleArtistsChange'
  },
  methods: {
    handleItemInit (el) {
      this.items.push(el)
    },
    handleItemLoadEnd () {
      this.items.forEach(item => {
        refreshVisibility(item)
      })
    },
    handleArtistsChange () {
      this.items = []
    }
  }
}
</script>

<style lang="sass" scoped></style>
