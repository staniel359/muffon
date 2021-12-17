<template>
  <div class="field">
    <input
      type="text"
      name="nickname"
      :placeholder="nicknameText"
      :value="value"
    >
  </div>
</template>

<script>
export default {
  name: 'BaseProfileNicknameField',
  props: {
    value: String
  },
  computed: {
    nicknameText () {
      return this.$t(
        'forms.fields.nickname'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
