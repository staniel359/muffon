<template>
  <div class="field">
    <input
      type="text"
      name="nickname"
      :placeholder="placeholderFormatted"
      :value="value"
    >
  </div>
</template>

<script>
export default {
  name: 'BaseNicknameField',
  props: {
    value: String
  },
  computed: {
    placeholderFormatted () {
      return this.$t(
        'shared.profile.form.fields.nickname'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
