<template>
  <div class="ui container main-container the-container">
    <RouterView :key="key" />
  </div>
</template>

<script>
export default {
  name: 'TheContainer',
  computed: {
    key () {
      return this.$route.fullPath
    }
  }
}
</script>

<style lang="sass" scoped>
.the-container
  padding-top: $mainContainerTopPadding
  padding-bottom: $mainContainerBottomPadding
</style>
