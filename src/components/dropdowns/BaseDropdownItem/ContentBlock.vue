<template>
  <div class="content">
    <h5
      v-if="header"
      class="header main-header"
      v-text="header"
    />

    <div
      v-if="content"
      class="subheader"
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

<style lang="sass" scoped></style>
