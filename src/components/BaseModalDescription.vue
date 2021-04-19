<template>
  <p class="main-text-container">
    {{ description }}
  </p>
</template>

<script>
export default {
  name: 'BaseModalDescription',
  props: {
    description: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped></style>
