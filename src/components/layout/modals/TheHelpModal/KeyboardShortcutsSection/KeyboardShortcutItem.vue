<template>
  <div class="middle-aligned main-list-bottom-large-section">
    <div>
      <kbd
        v-for="(key, index) in keys"
        :key="index"
        class="ui label main-key-label"
        v-text="key"
      />
    </div>

    <div class="main-right-section">
      <span
        v-text="text"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'KeyboardShortcutItem',
  props: {
    keyboardShortcutData: {
      type: Object,
      required: true
    }
  },
  computed: {
    keys () {
      return this.keyboardShortcutData.keys
    },
    text () {
      return this.$t(
        `keyboardShortcuts.${this.textScope}`
      )
    },
    textScope () {
      return this.keyboardShortcutData.textScope
    }
  }
}
</script>

<style lang="sass" scoped></style>
