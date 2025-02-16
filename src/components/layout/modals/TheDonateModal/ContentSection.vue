<template>
  <div class="content">
    <p
      v-for="(textItem, index) in donateText"
      :key="index"
      class="main-text-section"
      v-html="textItem"
    />
  </div>
</template>

<script>
export default {
  name: 'ContentSection',
  computed: {
    donateText () {
      return this.$tm(
        'donate.content'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
