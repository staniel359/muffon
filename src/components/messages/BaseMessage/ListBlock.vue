<template>
  <ul class="list">
    <ListItem
      v-for="listItemData in listItems"
      :key="listItemData.key"
      :list-item-data="listItemData"
    />
  </ul>
</template>

<script>
import ListItem from './ListBlock/ListItem.vue'

export default {
  name: 'ListBlock',
  components: {
    ListItem
  },
  props: {
    listItems: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped></style>
