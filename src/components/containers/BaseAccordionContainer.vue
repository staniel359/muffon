<template>
  <div
    class="ui accordion"
    ref="accordion"
    :class="{ inverted: isDarkMode }"
  >
    <div class="title">
      <i class="dropdown icon"></i>
      {{ title }}
    </div>

    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { setAccordion } from '#/actions/plugins/semantic'

export default {
  name: 'BaseAccordionContainer',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ])
  },
  mounted () {
    setAccordion(
      this.$refs.accordion,
      { duration: 0 }
    )
  }
}
</script>

<style lang="sass" scoped></style>
