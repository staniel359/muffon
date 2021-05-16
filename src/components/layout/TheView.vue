<template>
  <div class="ui container main-container the-view">
    <RouterView :key="key" />
  </div>
</template>

<script>
export default {
  name: 'TheView',
  computed: {
    key () {
      return this.$route.fullPath
    }
  }
}
</script>

<style lang="sass" scoped>
.the-view
  padding-top: $mainContainerTopPadding
  padding-bottom: $mainContainerBottomPadding
</style>
