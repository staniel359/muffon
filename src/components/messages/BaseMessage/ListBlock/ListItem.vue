<template>
  <li>
    <strong
      v-text="fileName"
    />

    <div
      v-text="filePath"
    />
  </li>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    listItemData: {
      type: Object,
      required: true
    }
  },
  computed: {
    fileName () {
      return this.filePathName[2]
    },
    filePathName () {
      return this.listItemData
        .text
        .match(
          /(.+)\/(.+)$/
        )
    },
    filePath () {
      return this.filePathName[1]
    }
  }
}
</script>

<style lang="sass" scoped></style>
