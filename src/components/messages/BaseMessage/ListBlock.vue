<template>
  <ul class="list">
    <li
      v-for="listItemData in listItems"
      :key="listItemData.key"
      v-text="listItemData.text"
    />
  </ul>
</template>

<script>
export default {
  name: 'ListBlock',
  props: {
    listItems: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped></style>
