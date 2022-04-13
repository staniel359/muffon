<template>
  <div class="field">
    <textarea
      type="text"
      name="description"
      rows="4"
      :placeholder="descriptionText"
      :value="value"
    />
  </div>
</template>

<script>
export default {
  name: 'BaseDescriptionField',
  props: {
    value: String
  },
  computed: {
    descriptionText () {
      return this.$t(
        'forms.fields.description'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
