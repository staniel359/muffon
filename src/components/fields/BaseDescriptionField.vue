<template>
  <div class="field">
    <textarea
      type="text"
      name="description"
      rows="4"
      :placeholder="descriptionText"
      :value="value"
      @keypress.ctrl.enter="handleCtrlEnter"
    />
  </div>
</template>

<script>
export default {
  name: 'BaseDescriptionField',
  props: {
    value: String
  },
  emits: [
    'submit'
  ],
  computed: {
    descriptionText () {
      return this.$t(
        'forms.fields.description'
      )
    }
  },
  methods: {
    handleCtrlEnter () {
      this.$emit(
        'submit'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
