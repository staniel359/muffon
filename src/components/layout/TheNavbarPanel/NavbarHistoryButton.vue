<template>
  <div class="fitted item">
    <button
      class="ui icon compact basic large button main-navbar-button"
      @click="handleClick"
    >
      <i
        class="arrow icon"
        :class="iconDirection"
      />
    </button>
  </div>
</template>

<script>
export default {
  name: 'NavbarHistoryButton',
  props: {
    direction: {
      type: String,
      required: true
    }
  },
  computed: {
    iconDirection () {
      return this.actionDirections[this.direction]
    },
    actionDirections () {
      return {
        back: 'left',
        forward: 'right'
      }
    }
  },
  methods: {
    handleClick () {
      this.$router[this.direction]()
    }
  }
}
</script>

<style lang="sass" scoped></style>
