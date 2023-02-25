<template>
  <div class="field">
    <textarea
      type="text"
      name="status"
      rows="4"
      :placeholder="statusText"
      :value="status"
      @keypress.ctrl.enter="handleCtrlEnter"
    />
  </div>
</template>

<script>
export default {
  name: 'BaseProfileStatusField',
  props: {
    status: String
  },
  emits: [
    'submit'
  ],
  computed: {
    statusText () {
      return this.$t(
        'forms.fields.status'
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
