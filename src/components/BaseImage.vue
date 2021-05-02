<template>
  <img
    class="ui image"
    :src="image"
  />
</template>

<script>
export default {
  name: 'BaseImage',
  props: {
    image: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped></style>
