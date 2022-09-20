<template>
  <div class="option">
    <BaseHeader
      class="option-header"
      tag="h4"
      :text="systemThemeText"
    />

    <BaseToggle
      store-key="layout.isWithSystemTheme"
      :is-checked="isWithSystemTheme"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/BaseToggle.vue'

export default {
  name: 'SystemThemeOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      'layout',
      [
        'isWithSystemTheme'
      ]
    ),
    systemThemeText () {
      return this.$t(
        'settings.options.app.theme.system'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
