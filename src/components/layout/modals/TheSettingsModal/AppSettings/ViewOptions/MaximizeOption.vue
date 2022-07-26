<template>
  <div class="option">
    <BaseHeader
      class="option-header"
      tag="h4"
      :text="maximizeText"
    />

    <BaseToggle
      store-key="layout.isMaximizeOnStart"
      :is-checked="isMaximizeOnStart"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseToggle from '*/components/BaseToggle.vue'

export default {
  name: 'MaximizeOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      'layout',
      [
        'isMaximizeOnStart'
      ]
    ),
    maximizeText () {
      return this.$t(
        'settings.options.app.view.maximize'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
