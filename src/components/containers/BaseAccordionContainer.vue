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
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { setAccordion } from '#/actions/plugins/semantic'
import { mainAccordionOptions } from '#/data/plugins/semantic'

export default {
  name: 'BaseAccordionContainer',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  emits: [
    'open'
  ],
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ])
  },
  mounted () {
    setAccordion(
      this.$refs.accordion,
      mainAccordionOptions({
        onOpen: this.handleOpen
      })
    )
  },
  methods: {
    handleOpen () {
      this.$emit('open')
    }
  }
}
</script>

<style lang="sass" scoped></style>
