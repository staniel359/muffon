<template>
  <BaseListContainer
    class="divided"
  >
    <ShowItem
      v-for="showData in showsCollection"
      :key="showData.uuid"
      :show-data="showData"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer
  from '@/components/containers/lists/BaseListContainer.vue'
import ShowItem from './BaseArtistShowsSimpleList/ShowItem.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'

export default {
  name: 'BaseArtistShowsSimpleList',
  components: {
    BaseListContainer,
    ShowItem
  },
  props: {
    shows: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    showsCollection () {
      return formatCollection(
        this.shows
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
