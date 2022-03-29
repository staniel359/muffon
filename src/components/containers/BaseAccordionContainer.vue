<template>
  <div
    class="ui accordion"
    ref="accordion"
    :class="{ inverted: isDarkMode }"
  >
    <div
      class="title"
      :class="{ 'text-color-white': isTextWhite }"
    >
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
import { setAccordion } from '*/helpers/actions/plugins/semantic'
import { mainAccordionOptions } from '*/helpers/data/plugins/semantic'

export default {
  name: 'BaseAccordionContainer',
  props: {
    title: {
      type: String,
      required: true
    },
    isTextWhite: Boolean
  },
  emits: [
    'init',
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

    this.$emit(
      'init',
      this.$refs.accordion
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
