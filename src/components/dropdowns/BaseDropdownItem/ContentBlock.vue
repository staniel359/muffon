<template>
  <div class="content">
    <h5
      v-if="header"
      class="header main-header"
      v-text="header"
    />

    <div
      v-if="content"
      class="subheader main-text-container"
      v-text="content"
    />
  </div>

  <div
    v-if="extra"
    class="description extra"
    v-text="extra"
  />
</template>

<script>
export default {
  name: 'ContentBlock',
  props: {
    header: String,
    content: String,
    extra: String
  }
}
</script>

<style lang="sass" scoped>
.subheader
  margin-top: 0.2rem
  font-size: 80%
</style>
